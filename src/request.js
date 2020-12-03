import request from "request";

export default (req, data) => {
  const options = {
    url: req.url,
    headers: req.headers,
    method: req.method || "POST",
    json: data
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) reject(error);
      else resolve(body);
    });
  });
};
