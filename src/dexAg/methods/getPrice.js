import configs from '../config';
import request from '../../request';
import { error, success } from '../../response';


export default body => {
  return new Promise((resolve, reject) => {
   const API_URL = configs.BASE_URL;
    const req = {
      url: API_URL + configs.PRICE,
      method: 'GET'
    };
    request(req)
      .then(result => {
        resolve(
          success({
            jsonrpc: "2.0",
            result: JSON.parse(result),
            id: body.id
          })
        );
      })
      .catch(err => {
        reject(error(err, ''));
      });
  });
};
