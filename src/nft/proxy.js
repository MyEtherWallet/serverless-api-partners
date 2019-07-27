import request from 'request';
import api from '../api';


export default (path, logger) => {
  return new Promise((resolve, reject) => {
    var options = {
      url: 'https://' + path,
      method: 'GET'
    };
    request(options, (error, response, body) => {
      if (logger) logger.process({method: 'nft'});
      if (error) reject(error);
      else {
        resolve(new api.ApiResponse(
          response,
          response.headers,
          200
        ));
      }
    });

  });
}

