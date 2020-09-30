import configs from '../config';
import request from '../../request';
import {error, success} from '../../response';


const processResult = (result, body) => {
  const combinedAndfiltered = new Set();
  const result1 = JSON.parse(result[1]);
  JSON.parse(result[0]).tokens.forEach(item => {
    const inBoth = result1.find(item1 => {
      return item1.address.toLowerCase() === item.address.toLowerCase()
    });
    if(inBoth){
      combinedAndfiltered.add(inBoth);
    }
  })
  return success({
    jsonrpc: '2.0',
    result: Array.from(combinedAndfiltered),
    id: body.id
  });
};
export default body => {
  return new Promise((resolve, reject) => {
    try {
      const useDefault = process.env.ALT_TOKEN_LIST || false;
      if (!useDefault) {
        const req = {
          url: `${configs.API_URL}token-list-full`,
          method: 'GET'
        };
        request(req)
          .then(result => {
            resolve(success({
              jsonrpc: '2.0',
              result: JSON.parse(result),
              id: body.id
            }));
          })
          .catch(err => {
            reject(error(err, ''));
          });
      } else {
        const dexag = {
          url: `${configs.API_URL}token-list-full`,
          method: 'GET'
        };

        const uniswapTokens = {
          url: `https://gateway.ipfs.io/ipns/tokens.uniswap.org`,
          method: 'GET'
        };
        Promise.all([request(uniswapTokens), request(dexag)])
          .then(results => {
            resolve(processResult(results, body));
          })
          .catch(err => {
            reject(error(err, ''));
          });
      }
    } catch (e) {
      reject(error(e, ''));
    }

  });
};
