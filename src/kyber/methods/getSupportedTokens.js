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
      url: API_URL + configs.SUPPORTED,
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
