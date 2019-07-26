import configs from '../config';
import request from '../../request';
import { error, success } from '../../response';


export default body => {
  return new Promise((resolve, reject) => {
    const req = {
      url: configs.API_URL_ETH + configs.SWAP
    };
    body.apiKey = configs.TOTLE_API_KEY

    request(req, body.params)
      .then(result => {
        resolve(
          success({
            jsonrpc: "2.0",
            result,
            id: body.id
          })
        );
      })
      .catch(err => {
        reject(error(err, ''));
      });
  });
};
