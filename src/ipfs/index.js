import {error, success} from '../response';
import {v4} from 'uuid';
import AdmZip from 'adm-zip';
import ipfsConfig from './config';
import AWS from 'aws-sdk';
import fs from 'fs';
import IpfsHttpClient from 'ipfs-http-client';
const { globSource } = IpfsHttpClient;
const PATH = '/tmp';
AWS.config.update({ region: ipfsConfig.REGION || 'us-east-2' })
const s3 = new AWS.S3();

function loginToTemporal(usr, pw) {
  return fetch(ipfsConfig.API_LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify({
        "username": usr.toString(),
        "password": usr.toString()
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
  // ipfs.add(globSource(PATH, {recursive: true})).then(response => {
  // })


  // const data = new FormData();
  // data.append("file", file);
  // data.append("hold_time", holdTime);
  // fetch( ipfsConfig.API_UPLOAD_URL, {
  //   method: 'POST',
  //   header: {
  //     "Authorization": `Bearer ${token}`,
  //     "Cache-Control": "no-cache"
  //   },
  //   body: data
  // }).then(hash => {
  //   resolve(hash);
  // }).catch(reject);
}

export default (req) => {
  const hash = v4()
  return new Promise((resolve, reject) => {
    if(req.body) {
      const parsedBody = JSON.parse(req.body);
      if(parsedBody.action === ipfsConfig.UPLOAD_METHOD) {
        const s3Params = {
          Bucket: ipfsConfig.BUCKET_NAME,
          Key:  hash,
          ContentType: 'application/zip',
          ACL: 'public-read'
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
      } else if (parsedBody.action === ipfsConfig.UPLOAD_COMPLETE) {
        const fileHash = parsedBody.hash;
        const s3Params = {
          Bucket: ipfsConfig.BUCKET_NAME,
          Key:  fileHash
        }
        // get file from s3
        const url = s3.getSignedUrl('getObject', s3Params);
        const fetchFile = fetch(url).then(res => {
          return res.json();
        }).catch(e => {
          reject(error(e));
        });
        fetchFile.then(file => {
          // login to temporal
          loginToTemporal(ipfsConfig.TEMPORAL_USERNAME, ipfsConfig.TEMPORAL_PW).then(token => {
            // upload files to ipfs
            uploadToIpfs(resolve, reject, token, file);
          })
        })
      } else {
        reject(error("Can't understand API call"))
      }
      // const tokenCall = login(ipfsConfig.TEMPORAL_USERNAME, ipfsConfig.TEMPORAL_PW).then((res) => {
      //   return res.json();
      // }).catch(error);

      // tokenCall.then(token => {
      //   upload(resolve, reject, token, req.body);
      // })
      
    } else {
      reject(error('No IPFS attached'));
    }
  })
};
