import {error, success} from '../response';
import {v4} from 'uuid';
import ipfsConfig from './config';
import AWS from 'aws-sdk';
AWS.config.update({ region: ipfsConfig.REGION || 'us-east-2' })
const s3 = new AWS.S3();
// import request from '../request';

function loginToTemporal(usr, pw) {
  return fetch(ipfsConfig.API_LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify({
        "username": username.toString(),
        "password": password.toString()
    })
  })
}

function uploadToIpfs(resolve, reject, token, file) {
  // unzip file
  const data = new FormData();
  data.append("file", file);
  data.append("hold_time", holdTime);
  fetch( ipfsConfig.API_UPLOAD_URL, {
    method: 'POST',
    header: {
      "Authorization": `Bearer ${token}`,
      "Cache-Control": "no-cache"
    },
    body: data
  }).then(hash => {
    resolve(hash);
  }).catch(reject);
}

export default (req, logger) => {
  const hash = v4()
  return new Promise((resolve, reject) => {
    if(req.body) {
      if (logger) logger.process(body);
      if(req.method === ipfsConfig.UPLOAD_METHOD) {
        const s3Params = {
          Bucket: ipfsConfig.BUCKET_NAME,
          Key:  hash,
          ContentType: 'application/zip',
          ACL: 'public-read',
          "content-length-range": [104857, 50485760]
        }
        const signedUrl = s3.getSignedUrl('putObject', s3Params);
        resolve({
          "statusCode": 200,
          "body": JSON.stringify({
            "signedUrl": signedUrl,
            "hashResponse": hash
          })
        });
      } else if (req.method === ipfsConfig.UPLOAD_COMPLETE) {
        const fileHash = req.body.hash;
        const s3Params = {
          Bucket: ipfsConfig.BUCKET_NAME,
          Key:  fileHash
        }
        // get file from s3
        const url = s3.getSignedUrl('getObject', s3Params);
        const fetchFile = fetch(url).then(res => {
          return res.json();
        }).catch(reject);
        fetchFile.then(file => {
          // login to temporal
          loginToTemporal(ipfsConfig.TEMPORAL_USERNAME, ipfsConfig.TEMPORAL_PW).then(token => {
            // upload files to ipfs
            uploadToIpfs(resolve, reject, token, file);
          })
        })
      } else {
        reject("Can't understand API call")
      }
      // const tokenCall = login(ipfsConfig.TEMPORAL_USERNAME, ipfsConfig.TEMPORAL_PW).then((res) => {
      //   return res.json();
      // }).catch(error);

      // tokenCall.then(token => {
      //   upload(resolve, reject, token, req.body);
      // })
      
    } else {
      reject('No IPFS attached');
    }
  })
};
