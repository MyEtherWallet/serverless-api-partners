import configs from '../config';
import requestPromise from '../../request';
import request from 'request'
import {error, success} from '../../response';
import wrappedRequest from '../wrappedRequest';
import SimpleEncryptor from 'simple-encryptor';
import getToken from '../getToken';
import statusRequest from '../bityRequestOnlyStatusResponse';
const encryptor = new SimpleEncryptor(configs.encryptionKey);


/**
 *
 Crypto to Crypto
 */
const formatResponse = (response, reqBody) => {
  return new Promise((resolve, reject) => {
    try {
      const statusId = response.result.headers['location'].replace('/api/v2/orders/', '').replace('/v2/orders/', '');

      const options = {
        url: configs.API_V2 + `/v2/orders/${statusId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + response.token
        },
        method: 'GET'
      };

      requestPromise(options)
        .then(rawRes => {
          const res = JSON.parse(rawRes);
          console.log(res);
          resolve({
            id: statusId,
            input: res.input,
            output: res.output,
            payment_details: res.payment_details,
            legacy_status: res.legacy_status,
            timestamp_created: res.timestamp_created,
            messageToSign: res.message_to_sign,
            validFor: 600,
            token: encryptor.encrypt(response.token)
          });
        });
    } catch (e) {
      reject(e);
    }
  });
};

export default body => {
  return new Promise((resolve, reject) => {

    const reqBody = {
      input: {
        amount: body.params.input.amount,
        currency: body.params.input.currency,
        type: 'crypto_address',
      },
      output: {
        currency: body.params.output.currency,
        type: 'crypto_address',
        crypto_address: body.params.output.crypto_address
      }
    };

    getToken()
      .then(token => {
        const options = {
          url: configs.API_V2 + configs.CREATE_ORDER_V2,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          method: 'POST',
          json: reqBody
        };

        return new Promise((resolve, reject) => {
          request(options, (error, response, body) => {
            if (error) reject(error);
            else {
              resolve({result: response, token: token});
            }
          });
        });
      })
      .then(result => {
        return formatResponse(result, reqBody);
      })
      .then(result => {
        resolve(
          success({
            jsonrpc: '2.0',
            result: result,
            id: body.id
          })
        );
      })
      .catch(err => {
        reject(error(err, ''));
      });
  });
};
