import {error} from '../response';
import allowedMethods from './validMethods';
import {
  createTransaction,
  getPrice,
  getSupportedCurrencies,
  supportedDexes
} from './methods';

export default (req, logger) => {
  return new Promise((resolve, reject) => {

    const errorLogging = error => {
      if (logger) console.log('DEX_AG ERROR', error, req.body.method);
      if (logger) logger.errorReporter('dexAg');
      reject(error);
    };

    if (req.body) {
      let body = req.body;
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

          }
        }
      }
    }
  });
};
