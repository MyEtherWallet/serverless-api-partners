import request from 'request';
import api from '../../api';


export default (token, logger) => {
  return new Promise((resolve, reject) => {
    var options = {
      url: `https://api.godsunchained.com/card/${token}`,
      method: 'GET'
    };
    request(options, (error, response, body) => {
      if (error) reject(error);
      if(logger) logger.process(JSON.parse(body))
      console.log( JSON.parse(body)); // todo remove dev item
      console.log(JSON.parse(body).image); // todo remove dev item
      var optionsImage = {
        url: JSON.parse(body).image,
        method: 'GET'
      };
      console.log(optionsImage); // todo remove dev item
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