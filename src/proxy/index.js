import {error, success} from '../response';
import request from '../request';
import validEndpoints from './config'
export default (req, logger) => {
  return new Promise((resolve, reject) => {
    let url = req.queryString.url;
    if (!validEndpoints.some(val => {
      return url.includes(val);
    })) {
      reject(error('Invalid Origin'));
      return;
    }
    const reqGet = {
      url: url,
      method: 'GET'
    };
    request(reqGet)
      .then(result => {
        resolve(success(result));
      })
      .catch(err => {
        console.log(err);
        if (logger) logger.errorReporter('proxy');
        reject(error(err, ''));
      });
  });
};
