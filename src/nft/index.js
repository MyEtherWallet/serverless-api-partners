import cryptoKitties from './contracts/cryproKitties'
import mycryptoheroes from './contracts/mycryptoheroes'
import godsunchained from './contracts/godsunchained'
import metadata from './contracts/721Metadata'
import proxyPass from './proxy'
import configs from './config'
import request from 'request';
import {error} from '../response';
import api from '../api';


export default (req, logger) => {
  return new Promise((resolve, reject) => {
    const query = req.queryString;
    if (logger) logger.process({method: 'nft'});
    if (query.proxy) {
      proxyPass(query.proxy, logger)
        .then(resolve)
        .catch(reject);
/*      var options = {
        url: 'https://' + query.proxy,
        method: 'GET'
      };
      // resolve(api.proxyRouter())
      request(options, (error, response, body) => {
        if (logger) logger.process({method: 'nft'});
        if (error) reject(error);
        else resolve(new api.ApiResponse(
          body,
          response.headers,
          200
        ));
      });*/
    } else if(query.contract) {
      const contract = query.contract;
      const contractDetails = configs.contracts.find(entry => entry.contractAddress.toLowerCase() === contract.toLowerCase());
      if(contractDetails){
        metadata(query.token, contractDetails)
          .then(resolve)
          .catch(reject);
      } else {
        switch (query.contract) {
          case '0x273f7f8e6489682df756151f5525576e322d51a3':
          case 'mycryptoheroes':
            mycryptoheroes(query.token, logger)
              .then(resolve)
              .catch(reject);
            break;
          case '0x06012c8cf97bead5deae237070f9587f8e7a266d':
          case 'cryptokitties':
            cryptoKitties(query.token)
              .then(resolve)
              .catch(reject);
            break;
          case '0x6ebeaf8e8e946f0716e6533a6f2cefc83f60e8ab':
          case 'godsunchained':
            godsunchained(query.token, logger)
              .then(resolve)
              .catch(reject);
            break;
          default:
            reject(error('unknown nft contract error'));
        }
      }

    }
  });
};
