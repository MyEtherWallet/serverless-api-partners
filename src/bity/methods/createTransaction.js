import configs from '../config';
import request from '../../request';
import {error, success} from '../../response';
import wrappedRequest from '../wrappedRequest';
import SimpleEncryptor from 'simple-encryptor';

const encryptor = new SimpleEncryptor(configs.encryptionKey);


/**
 *
 Crypto to Crypto
 */
const formatResponse = (response, reqBody) => {
  return new Promise((resolve, reject) => {
    // console.log(response.toJSON()); // todo remove dev item
    const statusId = response.result.headers['location'].replace('/api/v2/orders/', '').replace('/v2/orders/', '');

    const options = {
      url: configs.API_V2 + `/v2/orders/${statusId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + response.token
      },
      method: 'GET'
    };
    request(options)
      .then(rawRes => {
        const res = JSON.parse(rawRes)
        console.log(res);
        resolve({
          id: statusId,
          input: res.input,
          output: res.output,
          timestamp_created: res.timestamp_created,
          messageToSign: res.message_to_sign,
          validFor: 600,
        });
      });
  });
};

export default body => {
  return new Promise((resolve, reject) => {
    // if (
    //   !configs.orderValues[body.params.pair] ||
    //   !configs.orderValues[body.params.pair].active
    // ) {
    //   return reject(error("Not supported", body.id));
    // }

    const reqBody = {
      input: {
        amount: body.params.input.amount,
        currency: body.params.input.currency,
        type: 'crypto_address',
        crypto_address: body.params.input.crypto_address
      },
      output: {
        currency: body.params.output.currency,
        type: 'crypto_address',
        crypto_address: body.params.output.crypto_address
      }
    };


    // const reqBody = {
    //   amount: body.params.amount,
    //   pair: body.params.pair,
    //   amount_mode:
    //     configs.orderValues[body.params.pair].amount_mode[body.params.mode],
    //   category: configs.orderValues[body.params.pair].category,
    //   currency: configs.orderValues[body.params.pair].currency,
    //   payment_method: configs.orderValues[body.params.pair].payment_method,
    //   crypto_address: body.params.destAddress
    // };
    wrappedRequest(configs.API_V2 + configs.CREATE_ORDER_V2, reqBody, true)
      // request(req, reqBody)
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
