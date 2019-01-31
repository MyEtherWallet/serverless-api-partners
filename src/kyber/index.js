import { error } from '../response';
import allowedMethods from './validMethods';
import {
  getSupportedTokens,
  getCryptoRates
} from './methods';

export default (req, logger) => {
  return new Promise((resolve, reject) => {
    if (req.body) {
      let body = req.body;
      if (logger) logger.process(body);
      if (Array.isArray(body)) {
        reject(error(`Invalid Request - ${body}`));
      } else {
        if (allowedMethods.indexOf(body.method) == -1)
          reject(error(`Invalid Method - ${body.method}`));
        else {
          switch (body.method) {
            case 'getSupportedTokens':
              getSupportedTokens(body)
                .then(resolve)
                .catch(reject);
              break;
            case 'getCryptoRates':
              getCryptoRates(body)
                .then(resolve)
                .catch(reject);
              break;
            default:
              reject(error('unknown error'));
          }
        }
      }
    }
  });
};
