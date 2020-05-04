import configs from '../config';
import request from '../../request';
import {error, success} from '../../response';


export default body => {
  return new Promise((resolve, reject) => {
    if (!body.params.fromToken || !body.params.toToken || !body.params.fromValue) {
      reject(error('Missing body parameter', ''));
      return;
    }
    const req = {
      url: `${configs.API_URL}price?from=${body.params.fromToken}&to=${body.params.toToken}&fromAmount=${body.params.fromValue}&dex=all`,
      method: 'GET'
    };
    request(req)
      .then(result => {
        if(!Array.isArray(JSON.parse(result))){
          console.log(result);
          resolve(
            success({
              jsonrpc: '2.0',
              result: [],
              id: body.id
            })
          );
        } else {
          resolve(
            success({
              jsonrpc: '2.0',
              result: JSON.parse(result),
              id: body.id
            })
          );
        }

      })
      .catch(err => {
        reject(error(err, ''));
      });
  });
};
