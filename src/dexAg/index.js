import { error } from '../response';
import allowedMethods from './validMethods';
import {
  getSupportedTokens,
  getCryptoRates,
  getGasLimits
} from './methods';

export default (req, logger) => {
  return new Promise((resolve, reject) => {
    const errorLogging = error => {
      if(logger) console.log('DEXAG ERROR', error);
      if(logger) logger.errorReporter('dexAg');
      reject(error)
    };
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
                .catch(errorLogging);
              break;
            case 'getCryptoRates':
              getCryptoRates(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getGasLimits':
              getGasLimits(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            default:
              reject(error('unknown error'));
          }
        }
      }
    }
  });
};
