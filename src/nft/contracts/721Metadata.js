import request from 'request';
import api from '../../api';

const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce((obj, key) =>
    (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
};

export default (token, contractDetails, logger) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `${contractDetails.metadataAddress}${token}`,
      method: 'GET'
    };
    const requestAlt = request.defaults({encoding: null});
    request(options, (error, response, body) => {
      if (error) reject(error);
      if (logger) logger.process(JSON.parse(body));
      let resBody = JSON.parse(body);
      if (contractDetails.depth > 0) {
        const replacement = contractDetails.keys.indexOf('@tokenvalue@');
        if (replacement >= 0) {
          contractDetails.keys.splice(replacement, 1, token);
        }
        resBody = getNestedObject(resBody, contractDetails.keys);
      }

      const imageUri = resBody[contractDetails.imageKey];
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
      console.log(imageUri); // todo remove dev item

      request(optionsImage, (error, response, body) => {
        // console.log(body); // todo remove dev item
        let data = body;
        if (response.headers['content-type'].includes('svg')) {
          data = new Buffer(body).toString()
        } else {
          data = 'data:' + response.headers['content-type'] + ';base64,' + new Buffer(body).toString('base64');
        }
        console.log(data); // todo remove dev item
        if (error) reject(error);
        else resolve(new api.ApiResponse(
          data,
          response.headers,
          200
        ));
      });

    });
  });
}