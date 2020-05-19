import {error, success} from '../response';
import ipfsConfig from './config';
// import request from '../request';

function login(usr, pw) {
  return fetch(ipfsConfig.API_LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify({
        "username": username.toString(),
        "password": password.toString()
    })
  })
}

function upload(resolve, reject, token, file) {
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
      const tokenCall = login(ipfsConfig.TEMPORAL_USERNAME, ipfsConfig.TEMPORAL_PW).then((res) => {
        return res.json();
      }).catch(error);

      tokenCall.then(token => {
        upload(resolve, reject, token, req.body);
      })
      
    } else {
      reject('No IPFS attached');
    }
  })
};
