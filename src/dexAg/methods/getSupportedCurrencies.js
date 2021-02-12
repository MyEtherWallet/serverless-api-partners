import configs from '../config';
import request from '../../request';
import {error, success} from '../../response';


const processResult = (result, body) => {
  const combinedAndfiltered = new Set();
  const checked = new Set();
  combinedAndfiltered.add({
    'name': 'ETH ',
    'symbol': 'ETH',
    'address': '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    'decimals': 18
  });
  const result1 = JSON.parse(result[0]);
  const rae = result1.find(item => {
    return item.symbol.toLowerCase() === 'rae';
  });
  if (rae) {
    combinedAndfiltered.add(rae);
  }
  for (let i = 1; i < result.length; i++) {
    let resultCheck = JSON.parse(result[i]).tokens ;
    if (!Array.isArray(resultCheck)) {
      resultCheck = Object.values(resultCheck)
    }
    resultCheck.forEach(item => {
      const inBoth = result1.find(item1 => {
        return item1.address.toLowerCase() === item.address.toLowerCase();
      });

      if (inBoth) {
        if (!checked.has(inBoth.address.toLowerCase())) {
          checked.add(inBoth.address.toLowerCase());
          combinedAndfiltered.add(inBoth);
        }
      }
    });
  }

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

        const OneInch = {
          url: `https://api.1inch.exchange/v2.0/tokens`,
          method: 'GET'
        };

        const coinGeckoAndUniswap = {
          url: `https://www.coingecko.com/tokens_list/uniswap/defi_100/v_0_0_0.json`,
          method: 'GET'
        };
        Promise.all([request(dexag), request(uniswapTokens),  request(coinGeckoAndUniswap), request(OneInch)])
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
