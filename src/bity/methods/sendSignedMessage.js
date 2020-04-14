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
    wrappedRequest(configs.API_V2 + params.signature_submission_url, {body: params.signature})
      .then(result => {
        resolve(
          success({
            jsonrpc: '2.0',
            result: formatResponse(result),
            id: body.id
          })
        );
      })
      .catch(err => {
        console.log(err); // todo remove dev item
        reject(error(err, ''));
      });
  });
};
