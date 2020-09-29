import configs from '../config';
import request from '../../request';
import {error, success} from '../../response';


const processResult = (result, body) => {
  const useDefault = process.env.ALT_TOKEN_LIST || false;
  return success({
    jsonrpc: '2.0',
    result: JSON.parse(result),
    id: body.id
  })
};
export default body => {
  return new Promise((resolve, reject) => {
    const req = {
      url: `${configs.API_URL}token-list-full`,
      method: 'GET'
    };
    request(req)
      .then(result => {
        resolve(processResult(result, body));
      })
      .catch(err => {
        reject(error(err, ''));
      });
  });
};
