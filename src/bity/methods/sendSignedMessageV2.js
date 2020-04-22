import configs from '../config';
import requestPromise from '../../request';
import request from '../../request';
import {error, success} from '../../response';
import wrappedRequest from '../wrappedRequest';
import SimpleEncryptor from 'simple-encryptor';
import getToken from '../getToken';

const encryptor = new SimpleEncryptor(configs.encryptionKey);


/**
 *
 Crypto to Crypto
 */
const formatResponse = order => {
  return {
    created: order.statusCode === 204
  };
};

export default body => {
  return new Promise((resolve, reject) => {
    // if (
    //   !configs.orderValues[body.params.pair] ||
    //   !configs.orderValues[body.params.pair].active
    // ) {
    //   return reject(error("Not supported", body.id));
    // }
    const params = body.params;
    console.log(body); // todo remove dev item
    const options = {
      url: configs.API_V2 + params.signature_submission_url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + params.token
      },
      method: 'POST',
      body: JSON.stringify({body: params.signature})
    };
    // https://exchange.api.bity.com/v2/orders/{order_uuid}/signature
//     return new Promise((resolve, reject) => {
// ;
//     })
//     wrappedRequest(configs.API_V2 + params.signature_submission_url, {body: params.signature}, true)
    // request(options)
    let token;
    getToken()
      .then(tokenRecv => {
        token = tokenRecv;

        const options = {
          url: configs.API_V2 + params.signature_submission_url,
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + tokenRecv //params.token
          },
          method: 'POST',
          json:  {body: params.signature}
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
        console.log(result); // todo remove dev item
        const options = {
          url: configs.API_V2 + `/v2/orders/${params.statusId}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
          },
          method: 'GET'
        };
        requestPromise(options)
          .then(rawRes => {
            const res = JSON.parse(rawRes)
            console.log(res);
            resolve({
              id: params.statusId,
              input: res.input,
              output: res.output,
              payment_details: res.payment_details,
              legacy_status: res.legacy_status,
              timestamp_created: res.timestamp_created,
              validFor: 600,
            });
          });

        // resolve(
        //   success({
        //     jsonrpc: '2.0',
        //     result: formatResponse(result),
        //     id: body.id
        //   })
        // );
      })
      .catch(err => {
        console.log(err); // todo remove dev item
        reject(error(err, ''));
      });
  });
};
