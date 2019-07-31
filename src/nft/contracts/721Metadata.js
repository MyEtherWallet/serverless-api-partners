import request from 'request';
import api from '../../api';

export default (metaUrl, logger) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${metaUrl}`,
      method: 'GET'
    };

    request(options, (error, response, body) => {
      if (error) reject(error);
      if (logger) logger.process(JSON.parse(body));
      let resBody = JSON.parse(body);

      const imageUri = resBody['image_url'] || resBody['image'];
      if (!imageUri) {
        if (JSON.parse(body).message) {
          reject(JSON.parse(body).message);
          return;
        }
      }
      const optionsImage = {
        url: imageUri,
        method: 'GET',
        encoding: null
      };
      request(optionsImage, (error, response, body) => {
        let data = body;
        if (error) reject(error);
        try {
          data = 'data:' + response.headers['content-type'] + ';base64,' + new Buffer(body).toString('base64');
        } catch (e) {
          reject(e);
        }
        try {
          resolve(new api.ApiResponse(
            data,
            {
              'content-type': 'text/html'
            },
            200
          ));
        } catch (e) {
          reject(e);
        }
      });

    });
  });
}