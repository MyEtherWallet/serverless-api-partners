import { error } from '../response';
import allowedMethods from './validMethods';
import {
  getEstimate,
  createTransaction,
  getStatus,
  loginWithPhone,
  sendReceivedSmsCode,
  createPhoneTransaction,
  getExitOrderDetails,
  getStatusFiat,
  getFiatRates,
  getCryptoRates,
  createOrder,
  createOrderDetails
} from './methods';

export default (req, logger) => {
  return new Promise((resolve, reject) => {
    const errorLogging = error => {
      logger.errorReporter('bity');
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
              createTransaction(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getStatus':
              getStatus(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'logInWithPhoneNumber':
              loginWithPhone(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'sendReceivedSmsCode':
              sendReceivedSmsCode(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'createExitToFiatTransaction':
              createPhoneTransaction(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getExitOrderDetails':
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
              createOrder(body)
                .then(resolve)
                .catch(errorLogging);
              break;
            case 'getOrderDetails':
              createOrderDetails(body)
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
