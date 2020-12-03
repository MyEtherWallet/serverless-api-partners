import {error, success} from '../response';
import changellyConfigs from './config';
import allowedMethods from './validMethods';
import request from '../request';
import crypto from 'crypto';

export default (req, logger) => {
  const alternativeHandlingMethods = ['getFixRate', 'getExchangeAmount'];
  let activeMethod = false; // getFixRate getExchangeAmount
  return new Promise((resolve, reject) => {
    if (req.body) {
      const body = req.body;
      if (logger) logger.process(body);
      if (Array.isArray(body)) {
        reject(error(`Invalid Request - ${body}`));
      } else {
        if (allowedMethods.indexOf(body.method) === -1)
          reject(error(`Invalid Method - ${body.method}`));
        else {
          // eslint-disable-next-line
          activeMethod = alternativeHandlingMethods.includes(body.method);
          const req = {
            url: changellyConfigs.API_URL,
            headers: {
              'api-key': changellyConfigs.CHANGELLY_API_KEY,
              sign: crypto
                .createHmac('sha512', changellyConfigs.CHANGELLY_SECRET)
                .update(JSON.stringify(body))
                .digest('hex')
            }
          };
          request(req, body)
            .then(result => {
              if(!Array.isArray(result)){
                if(result.error){
                  if (logger) console.log('CHANGELLY ERROR', result);
                  resolve(success({result: [{
                    min: 0,
                    max: 0,
                    result: 0,
                    id: 0
                  }]}));
                  return;
                }
              }
              resolve(success(result));
            })
            .catch(err => {
              if (logger) console.log('CHANGELLY ERROR', err);
              if (logger) logger.errorReporter('changelly');
              reject(error(err, ''));
            });
        }
      }
    }
  });
};
