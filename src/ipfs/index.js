import {error, success} from '../response';
import {v4} from 'uuid';
import AdmZip from 'adm-zip';
import ipfsConfig from './config';
import AWS from 'aws-sdk';
import fs from 'fs';
import IpfsHttpClient from 'ipfs-http-client';
import fetch from 'node-fetch';
import contentHash from 'content-hash';
const { globSource } = IpfsHttpClient;
const PATH = './tmp';
AWS.config.update({ region: ipfsConfig.REGION || 'us-east-2' })
const s3 = new AWS.S3({
  signatureVersion: 'v4'
});

function loginToTemporal(usr, pw) {
  return fetch(ipfsConfig.API_LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: JSON.stringify({
        "username": usr,
        "password": pw
    })
  })
}

async function uploadToIpfs(resolve, reject, token, file, hash) {
  // unzip file 
  if(!fs.existsSync(PATH)) {
    fs.mkdirSync(`${PATH}`);
  } else {
    // fs.rmdirSync(PATH);
    fs.mkdirSync(`${PATH}/${hash}`, {recursive: true});
  }
  const unzipped = new AdmZip(file);
  unzipped.extractAllTo(`${PATH}/${hash}`, true);
  const ipfs = IpfsHttpClient({
    host: ipfsConfig.API_UPLOAD_HOST,
    port: ipfsConfig.API_UPLOAD_PORT,
    protocol: ipfsConfig.API_UPLOAD_PROTOCOL,
    headers: {
      authorization: `Bearer ${token.token}`,
      "X-Hold-Time": 24
    }
  });
  
  try {
    const folderName = fs.readdirSync(`${PATH}/${hash}`);
    const file = await ipfs.add(globSource(`${PATH}/${hash}/${folderName[0]}`, {recursive: true}));
    for await (const f of file) {
      if(file.path === folderName[0]) {
        const actualCid = file.cid.substring(4, file.cid.length -1);
        const hash = contentHash.fromIpfs(actualCid);
        resolve(success(hash));
      }
    }
  } catch(e) {
    reject(error("Error with uploading to temporal"));
  }
}

export default (req) => {
  const hash = v4()
  return new Promise((resolve, reject) => {
    if(req.body) {
      if(req.body.method === ipfsConfig.UPLOAD_METHOD) {
        const s3Params = {
          Bucket: ipfsConfig.BUCKET_NAME,
          Key:  `${hash}.zip`,
          ContentType: 'application/zip'
        }
        const signedUrl = s3.getSignedUrl('putObject', s3Params);
        resolve(
          success({
            "body": {
              "signedUrl": signedUrl,
              "hashResponse": hash
            }
          })
        );
      } else if (req.body.method === ipfsConfig.UPLOAD_COMPLETE) {
        const fileHash = req.body.hash;
        const s3Params = {
          Bucket: ipfsConfig.BUCKET_NAME,
          Key: `${fileHash}.zip`
        }
        // get file from s3
        s3.getObject(s3Params)
        .promise()
        .then(data => {
            try {
              // login to temporal
              const tokenPromise = loginToTemporal(ipfsConfig.TEMPORAL_USERNAME, ipfsConfig.TEMPORAL_PW).then(tempLogin => {
                // upload files to ipfs
                return tempLogin.json();
              });
              tokenPromise.then(token => {
                uploadToIpfs(resolve, reject, token, data.Body, fileHash);
              }).catch(e => {
                reject(error(e))
              })
            } catch(e) {
              reject(error(e));
            }
        }).catch(e => {
                reject(error(e))
              });
      } else {
        reject(error("Can't understand API call"))
      }
    } else {
      reject(error('No IPFS attached'));
    }
  })
};
