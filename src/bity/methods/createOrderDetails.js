import configs from '../config';
import request from 'request';

import {error, success} from '../../response';
import SimpleEncryptor from 'simple-encryptor';

const encryptor = new SimpleEncryptor(configs.encryptionKey);
const formatResponse = (order, statusId) => {
  const orderJson = JSON.parse(order);
  return {
    id: encryptor.encrypt(statusId),
    amount: orderJson.output.amount,
    payment_address: orderJson.payment_details.crypto_address,
    payment_amount: orderJson.input.amount,
    status: orderJson.legacy_status,
    validFor: 600,
    timestamp_created: orderJson.timestamp_created + 'Z',
    input: {
      amount: orderJson.input.amount,
      currency: orderJson.input.currency
    },
    output: {
      amount: orderJson.output.amount,
      currency: orderJson.output.currency
    }
  };
};

const requestor = (req) => {
  var options = {
    url: req.url,
    headers: req.headers,
    method: 'GET'
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) reject(error);
      else resolve(body);
    });
  });
};

export default body => {
  return new Promise((resolve, reject) => {
    let statusId;
    if(body.params.detailsUrl.includes('-')){
      statusId = body.params.detailsUrl;
    } else {
      statusId = encryptor.decrypt(body.params.detailsUrl);
    }
    const req = {
      url: configs.API_V2 + configs.ORDER_DETAIL_URL_V2 + statusId,
      headers: {
        Authorization: 'Bearer ' + configs.BITY_TOKEN,
        'content-type': 'application/json'
      }
    };

    requestor(req)
      .then(result => {
        resolve(
          success({
            jsonrpc: '2.0',
            result: formatResponse(result, body.params.detailsUrl),
            id: body.id
          })
        );
      })
      .catch(err => {
        reject(error(err, '3'));
      });
  });
};
