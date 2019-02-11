import configs from '../config';
import request from 'request';

import { error, success } from '../../response';
import SimpleEncryptor from 'simple-encryptor';

const encryptor = new SimpleEncryptor(configs.encryptionKey);
const formatResponse = (order, detailsUrl) => {
  const orderJson = JSON.parse(order);
  return {
    id: detailsUrl,
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
    if (
      !configs.fiatValues[body.params.pair] ||
      !configs.fiatValues[body.params.pair].active
    ) {
      error(body.params);
      return reject(error('Not supported', body.id));
    }
    const phoneToken = encryptor.decrypt(body.params.phoneToken);
    const detailsUrl = encryptor.decrypt(body.params.detailsUrl);
    const req = {
      url: configs.API_URL + configs.ORDER_DETAIL_URL + detailsUrl,
      headers: {'X-Phone-Token': phoneToken, Authorization: 'Bearer ' + configs.BITY_TOKEN}
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
