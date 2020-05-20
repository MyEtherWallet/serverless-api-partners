import {error, success} from '../response';
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
  return new Promise((resolve, reject) => {
    if(req.body) {
      if (logger) logger.process(body);
      if(req.body.requestKey && req.body.file) {
        const s3Params = {
          Bucket: ipfsConfig.BUCKET_NAME,
          Key:  req.body.name,
          ContentType: 'application/zip'
        }

        const signedUrl = s3.getSignedUrl('putObject', s3Params);
        resolve({
          "statusCode": 200,
          "body": JSON.stringify({
            "signedUrl": signedUrl,
            "name": req.body.name
          })
        });
      } else if (req.body.hash) {
        // get file from s3
        // unzip file
        // login to temporal
        // upload files to ipfs
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
