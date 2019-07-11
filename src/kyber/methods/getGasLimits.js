import configs from '../config';
import request from '../../request';
import { error, success } from '../../response';


export default body => {
  return new Promise((resolve, reject) => {
    let API_URL;
    if(body.params.includes('ROP')){
      API_URL = configs.API_URL_ROP
    } else {
      API_URL = configs.API_URL_ETH
    }
    const req = {
      url: API_URL + configs.GAS_LIMIT,
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
