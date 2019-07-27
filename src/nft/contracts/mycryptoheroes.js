import request from 'request';
import api from '../../api';

export default (token, logger) => {
  return new Promise((resolve, reject) => {
    var options = {
      url: `https://www.mycryptoheroes.net/metadata/hero/${token}`,
      method: 'GET'
    };
    request(options, (error, response, body) => {
      if (error) reject(error);
      if(logger) logger.process(JSON.parse(body))
      var optionsImage = {
        url: JSON.parse(body).image,
        method: 'GET'
      };
      request(optionsImage, (error, response, body) => {
        if (error) reject(error);
        else resolve(new api.ApiResponse(
          body,
          response.headers,
          200
        ));
      });

    });
  });
}