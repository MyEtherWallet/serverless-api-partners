import configs from '../config';
import request from '../../request';
import {error, success} from '../../response';


export default body => {
  return new Promise((resolve, reject) => {
    if (!body.params.transactionParams) {
      reject(error('Missing body parameter', ''));
      return;
    }
    const transactionParams = body.params.transactionParams;
    const req = {
      url: `${configs.API_URL}tradeAndSend?from=${transactionParams.fromCurrency}&to=${transactionParams.toCurrency}&fromAmount=${transactionParams.fromValue}&dex=${transactionParams.dex}&recipient=${transactionParams.toAddress}&proxy=${configs.PROXY_CONTRACT_ADDRESS}`,
      method: 'GET'
    };
    console.log(req); // todo remove dev item
    request(req)
      .then(result => {
        const parsedResult = JSON.parse(result);
        if(parsedResult.error){
          console.log('DEXAG ERROR', req, result); // todo remove dev item
        }
        resolve(
          success({
            jsonrpc: '2.0',
            result: parsedResult,
            id: body.id
          })
        );
      })
      .catch(err => {
        reject(error(err, ''));
      });
  });
};
