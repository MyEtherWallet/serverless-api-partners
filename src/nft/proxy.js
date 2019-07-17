


import request from 'request';
import api from '../api';


export default (path, logger) => {
  return new Promise((resolve, reject) => {
    var options = {
      url: 'https://' + path,
      method: 'GET'
    };
    // resolve(api.proxyRouter())
    request(options, (error, response, body) => {
      if (logger) logger.process({method: 'nft'});
      if (error) reject(error);
      else {
        // let data = body;
        // if (response.headers['content-type'].includes('svg')) {
        //   data = new Buffer(body).toString()
        // } else {
        //   data = 'data:' + response.headers['content-type'] + ';base64,' + new Buffer(body).toString('base64');
        // }
        resolve(new api.ApiResponse(
          response,
          response.headers,
          200
        ));
      }
    });

  });
}

