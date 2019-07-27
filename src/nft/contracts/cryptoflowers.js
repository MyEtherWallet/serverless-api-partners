import request from 'request';
import api from '../../api';


export default (token, logger) => {
  return new Promise((resolve, reject) => {
    let options = {
      url: `https://api.godsunchained.com/card/${token}`,
      method: 'GET'
    };
    request(options, (error, response, body) => {
      if (error) reject(error);
      if (logger) logger.process(JSON.parse(body));
      let optionsImage = {
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