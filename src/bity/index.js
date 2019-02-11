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
  getStatusFiat
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
            case 'createTransaction':
              createTransaction(body)
                .then(resolve)
                .catch(reject);
              break;
            case 'getStatus':
              getStatus(body)
                .then(resolve)
                .catch(reject);
              break;
            case 'logInWithPhoneNumber':
              loginWithPhone(body)
                .then(resolve)
                .catch(reject);
              break;
            case 'sendReceivedSmsCode':
              sendReceivedSmsCode(body)
                .then(resolve)
                .catch(reject);
              break;
            case 'createExitToFiatTransaction':
              createPhoneTransaction(body)
                .then(resolve)
                .catch(reject);
              break;
            case 'getExitOrderDetails':
              getExitOrderDetails(body)
                .then(resolve)
                .catch(reject);
              break;
            case 'getStatusFiat':
              getStatusFiat(body)
                .then(resolve)
                .catch(reject);
              break;
            case 'getEstimate':
              getEstimate(body)
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
