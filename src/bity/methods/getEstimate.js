import configs from '../config';
import request from '../../request';
import {error, success} from '../../response';

const formatResponse = order => {
  return order;
};
export default body => {
  return new Promise((resolve, reject) => {
    const pairOptions = [...Object.keys(configs.orderValues), ...Object.keys(configs.fiatValues)];
    let notSupported = true;

    if(configs.disabledPairs.includes(body.params.pair)){
     return resolve(
        success({
          jsonrpc: '2.0',
          result: {
            input:{
              amount: 1,
              minimum_amount: 0
            },
            output: {
              amount: 0
            }
          },
          id: body.id
        })
      );
    }

    if(pairOptions.includes(body.params.pair)){
      if(configs.orderValues[body.params.pair]){
        notSupported = !configs.orderValues[body.params.pair].active
      } else if(configs.fiatValues[body.params.pair]){
        notSupported = !configs.fiatValues[body.params.pair].active
      }
    }

    if (notSupported) {
      return reject(error('Not supported', body.id));
    }
    const req = {
      url: configs.API_V2 + configs.ESTIMATE_V2,
      headers: {'content-type': 'application/json', 'accept': 'application/json'}
    };

    const reqBody = {
      'input': {
        'currency': body.params.fromCurrency,
        'amount': `${body.params.fromValue || body.params.amount}`
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
