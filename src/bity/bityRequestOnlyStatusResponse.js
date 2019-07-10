import request from 'request';

export default (req, data) => {
  const returnBody = typeof data === 'string';
  let     options = {
    url: req.url,
    headers: req.headers,
    method: req.method || 'POST',
    json: data
  };



  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (body) {
        if(returnBody) {
          resolve(JSON.stringify(body));
        } else {
          reject(JSON.stringify(body));
        }
      } else {
        resolve(response);
      }
    });
  });
}
