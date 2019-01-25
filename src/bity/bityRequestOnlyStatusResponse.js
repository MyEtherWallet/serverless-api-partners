import request from 'request';

export default (req, data) => {
  var options = {
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
        reject(JSON.stringify(body));
      } else {
        resolve(response);
      }
    });
  });
}
