import configs from '../config';
import request from '../../request';
import {error, success} from '../../response';
// import SimpleEncryptor from 'simple-encryptor';
import getToken from '../getToken';

// const encryptor = new SimpleEncryptor(configs.encryptionKey);


/**
 *
 Crypto to Crypto Order Details
 */

export default body => {
  return new Promise((resolve, reject) => {

    getToken()
      .then(token => {
        const options = {
          url: configs.API_V2 + `/v2/orders/${body.params.statusId}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          method: 'GET'
        };
        return request(options);
      })
      .then(rawRes => {
        const res = JSON.parse(rawRes);
        console.log(res);
        resolve();
        resolve(
          success({
            jsonrpc: '2.0',
            result: {
              id: body.params.statusId,
              input: res.input,
              output: res.output,
              payment_details: res.payment_details,
              legacy_status: res.legacy_status,
              timestamp_created: res.timestamp_created,
              messageToSign: res.message_to_sign,
              validFor: 600
            },
            id: body.id
          })
        );
      })
      .catch(err => {
        reject(error(err, ''));
      });
  });
};
