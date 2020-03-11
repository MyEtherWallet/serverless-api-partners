import { error } from '../response';
import allowedMethods from './validMethods';
import {
  getPriceAndOrderDetails,
  getPrice,
  generateTransaction,
  getAvailableTokens
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
            case 'getPriceAndOrderDetails':
              getPriceAndOrderDetails(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getPrice':
              getPrice(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'generateTransaction':
              generateTransaction(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getAvailableTokens':
              getAvailableTokens(body)
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
