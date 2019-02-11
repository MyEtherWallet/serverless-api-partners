import configs from '../config';
import request from '../../request';
import { error, success } from '../../response';

const formatResponse = order => {
  return order;
};
export default body => {
  return new Promise((resolve, reject) => {
    if (
      !configs.orderValues[body.params.pair] ||
      !configs.orderValues[body.params.pair].active
    ) {
      return reject(error('Not supported', body.id));
    }
    const req = {
      url: configs.API_URL + configs.ESTIMATE,
      headers: {Authorization: 'Bearer ' + configs.BITY_TOKEN}
    };
    const reqBody = {
      'input': {
        'currency': body.params.fromCurrency,
        'amount': body.params.fromValue
      },
      'output': {
        'currency': body.params.toCurrency
      }
    };
    request(req, reqBody)
      .then(result => {
        resolve(
          success({
            jsonrpc: '2.0',
            result: formatResponse(result),
            id: body.id
          })
        );
      })
      .catch(err => {
        reject(error(err, ''));
      });
  });
};
