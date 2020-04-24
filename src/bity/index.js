import { error } from '../response';
import allowedMethods from './validMethods';
import {
  getEstimate,
  createTransactionV2,
  createTransaction,
  getStatus,
  createPhoneTransaction,
  getExitOrderDetails,
  getStatusFiat,
  getFiatRates,
  getCryptoRates,
  createFiatOrder,
  createFiatOrderDetails,
  sendSignedMessageV2,
  getCryptoOrderDetailsV2,
  getStatusV2
} from './methods';

export default (req, logger) => {
  return new Promise((resolve, reject) => {
    const errorLogging = error => {
      if(logger) console.log('BITY ERROR', error);
      if(logger) logger.errorReporter('bity');
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
            case 'createTransaction':
              // v1
              createTransaction(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'createTransactionV2':
              // v1
              createTransactionV2(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getCryptoOrderDetailsV2':
              // fiat
              getCryptoOrderDetailsV2(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'sendSignedMessageV2':
              sendSignedMessageV2(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getStatusV2':
              getStatusV2(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getStatus':
              getStatus(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'createExitToFiatTransaction':
              createPhoneTransaction(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getExitOrderDetails':
              // is this still used
              getExitOrderDetails(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getStatusFiat':
              getStatusFiat(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getEstimate':
              getEstimate(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'createOrder':
              // to fiat
              createFiatOrder(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getOrderDetails':
              // fiat
              createFiatOrderDetails(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getFiatRates':
              getFiatRates(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getCryptoRates':
              getCryptoRates(body)
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
