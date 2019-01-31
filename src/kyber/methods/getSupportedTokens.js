import configs from '../config';
import request from '../../request';
import { error, success } from '../../response';


export default () => {
  return new Promise((resolve, reject) => {
    const req = {
      url: configs.API_URL + configs.SUPPORTED,
      method: 'GET'
    };
    request(req)
      .then(result => {
        resolve(
          success(JSON.parse(result))
        );
      })
      .catch(err => {
        reject(error(err, ''));
      });
  });
};
