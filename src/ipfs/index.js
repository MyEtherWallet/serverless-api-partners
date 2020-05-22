import {error, success} from '../response';
import {v4} from 'uuid';
import AdmZip from 'adm-zip';
import ipfsConfig from './config';
import AWS from 'aws-sdk';
import fs from 'fs';
import IpfsHttpClient from 'ipfs-http-client';
import fetch from 'node-fetch';
const { globSource } = IpfsHttpClient;
const PATH = '/tmp';
AWS.config.update({ region: ipfsConfig.REGION || 'us-east-2' })
const s3 = new AWS.S3({
  signatureVersion: 'v4'
});

function loginToTemporal(usr, pw) {
  return fetch(ipfsConfig.API_LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify({
        "username": usr.toString(),
        "password": pw.toString()
    })
  })
}

async function uploadToIpfs(resolve, reject, token, file) {
  // unzip file
  fs.mkdirSync(PATH);
  const unzipped = new AdmZip(file);
  unzipped.extractAllTo(PATH);

  const ipfs = IpfsHttpClient({
    host: ipfsConfig.API_UPLOAD_URL,
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  try {
    for await (const file of ipfs.add(globSource('./docs', { recursive: true }))) {
      if(file.path === PATH.replace('/', '')) {
        resolve(success(file.cid));
      }
    }
  } catch(e) {
    reject(error(e));
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
            "statusCode": 200,
            "body": JSON.stringify({
              "signedUrl": signedUrl,
              "hashResponse": hash
            })
          })
        );
      } else if (req.body.method === ipfsConfig.UPLOAD_COMPLETE) {
        const fileHash = req.body.hash;
        const s3Params = {
          Bucket: ipfsConfig.BUCKET_NAME,
          Key:  `${fileHash}.zip`
        }
        // get file from s3
        const signedUrl = s3.getSignedUrl('getObject', s3Params);
        fetch(signedUrl).then(retrievedFile => {
          // login to temporal
          loginToTemporal(ipfsConfig.TEMPORAL_USERNAME, ipfsConfig.TEMPORAL_PW).then(tempLogin => {
            // upload files to ipfs
            tempLogin.json().then(token => {
              uploadToIpfs(resolve, reject, token, retrievedFile);
            }).catch(e => {
              reject(error(e))
            })
          }).catch(e => {
            reject(error(e))
          })
        })
      } else {
        reject(error("Can't understand API call"))
      }
    } else {
      reject(error('No IPFS attached'));
    }
  })
};
