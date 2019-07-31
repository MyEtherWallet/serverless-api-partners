import {
  cryptoKitties,
  nonStandardContracts,
  mycryptoheroes,
  godsunchained,
  staticmetadata,
  metadata
} from './contracts';
import proxyPass from './proxy';
import configs from './config';
import {error} from '../response';
import api from '../api';

// Need to implement guards
export default (req, logger) => {
  return new Promise((resolve, reject) => {
    const query = req.queryString;
    if (logger) logger.process({method: 'nft'});
    if(query.supported){
      resolve(new api.ApiResponse(
        configs.contracts,
        {
          contentType: 'application/json'
        },
        200
      ));
    } else if (query.proxy) {
      proxyPass(query.proxy, logger)
        .then(resolve)
        .catch(reject);
    } else if (query.nonStandardContract) {
      nonStandardContracts(query.nonStandardContract, query.address, query.offset)
        .then(resolve)
        .catch(reject);
    }  else if(query.metadataUri){
      metadata(query.metadataUri)
        .then(resolve)
        .catch(reject);

    } else if (query.contract) {
      const contract = query.contract;
      const contractDetails = configs.contracts.find(entry => entry.contractAddress.toLowerCase() === contract.toLowerCase());
      if (contractDetails) {
        staticmetadata(query.token, contractDetails)
          .then(resolve)
          .catch(reject);
      } else {
        switch (query.contract) {
          case '0x06012c8cf97bead5deae237070f9587f8e7a266d':
          case 'cryptokitties':
            cryptoKitties(query.token, '0x06012c8cf97bead5deae237070f9587f8e7a266d')
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
