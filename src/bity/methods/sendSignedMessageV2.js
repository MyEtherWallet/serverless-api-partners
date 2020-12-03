import configs from '../config';
import requestPromise from '../../request';
import request from 'request';
import {error, success} from '../../response';
import SimpleEncryptor from 'simple-encryptor';

const encryptor = new SimpleEncryptor(configs.encryptionKey);

export default body => {
  return new Promise((resolve, reject) => {
    const params = body.params;
    const authToken = encryptor.decrypt(params.token);

    const sendSig = () => {
      const options = {
        url: configs.API_V2 + params.signature_submission_url,
        headers: {
          'Content-Type': 'text/plain',
        },
        method: 'POST',
        body: params.signature
      };
      return new Promise((resolve, reject) => {
        request(options, (error, response) => {
          if (error) reject(error);
          else {
            resolve(response);
          }
        });
      });
    };
    sendSig()
      .then((response) => {

        if (response.statusCode !== 204) {
          throw Error('was not created');
        }
      })
      .then(result => {
        console.log(result); // todo remove dev item
        const options = {
          url: configs.API_V2 + `/v2/orders/${params.statusId}`,
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          },
          method: 'GET'
        };
        return requestPromise(options);


      })
      .then(rawRes => {
        const res = JSON.parse(rawRes);
        console.log(res);
        resolve(
          success({
            jsonrpc: '2.0',
            result: {
              id: params.statusId,
              input: res.input,
              output: res.output,
              payment_details: res.payment_details,
              legacy_status: res.legacy_status,
              timestamp_created: res.timestamp_created,
              validFor: 600,
            },
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
