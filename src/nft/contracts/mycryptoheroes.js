import request from 'request';
import api from '../../api';


export default (token, contract) => {
  return new Promise((resolve, reject) => {
    var options = {
      url: `https://www.mycryptoheroes.net/metadata/hero/${token}`,
      method: 'GET'
    };
    request(options, (error, response, body) => {
      if (error) reject(error);
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