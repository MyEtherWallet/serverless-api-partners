import {error} from '../response';
// import changellyConfigs from './config';
import allowedMethods from './validMethods';
// import request from '../request';
// import crypto from 'crypto';
import {
  createTransaction,
  getPrice,
  getSupportedCurrencies,
  supportedDexes,
  excludedDexes
} from './methods';

export default (req, logger) => {
  return new Promise((resolve, reject) => {

    const errorLogging = error => {
      if (logger) console.log('DEX_AG ERROR', error);
      if (logger) logger.errorReporter('dexAg');
      reject(error);
    };

    if (req.body) {
      const body = req.body;
      if (logger) logger.process(body);
      if (Array.isArray(body)) {
        reject(error(`Invalid Request - ${body}`));
      } else {
        if (allowedMethods.indexOf(body.method) === -1)
          reject(error(`Invalid Method - ${body.method}`));
        else {
          switch (body.method) {
            case 'getPrice':
              getPrice(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'createTransaction':
              createTransaction(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getSupportedCurrencies':
              getSupportedCurrencies(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'supportedDexes':
              supportedDexes(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'excludedDexes':
              excludedDexes(body)
                .then(resolve)
                .catch(errorLogging);
              break;

          }
        }
      }
    }
  });
};
