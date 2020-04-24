import configs from '../config';
import request from '../../request';
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
    console.log(response.result.headers); // todo remove dev item
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
    console.log("=-=-=-=-=-=-=-=-=-=-=--=-=-=-="); // todo remove dev item
    console.log(options); // todo remove dev item
    request(options)
      .then(rawRes => {
        const res = JSON.parse(rawRes)
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
          token: response.token
        });
      });
  });
};

const requestor = (req) => {
  var options = {
    url: req.url,
    headers: req.headers,
    method: 'GET'
  };

  return statusRequest(options, 'yes');
};

const cryptoToFiat = body => {
  return new Promise((resolve, reject) => {
    getToken()
      .then(token => {

        const req = {
          url: configs.API_V2 + configs.CREATE_ORDER_V2,
          // 'url': 'https://exchange.api.bity.com/v2/orders',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          'method': 'POST'
        };
        const reqBody = {
          contact_person: {
            email: body.params.orderDetails.email,
          },
          input: {
            amount: body.params.orderDetails.input.amount,
            currency: body.params.orderDetails.input.currency,
            type: 'crypto_address',
            crypto_address: body.params.orderDetails.input.crypto_address
          },
          output: {
            currency: body.params.orderDetails.currency,
            type: 'bank_account',
            iban: body.params.orderDetails.iban,
            bic_swift: body.params.orderDetails.bic_swift,
            owner: {
              name: body.params.orderDetails.name,
              address: body.params.orderDetails.address,
              address_complement: body.params.orderDetails.address_complement,
              zip: body.params.orderDetails.zip,
              city: body.params.orderDetails.city,
              state: body.params.orderDetails.state,
              country: body.params.orderDetails.country
            }
          }

        };

        wrappedRequest(req, reqBody)
          .then(result => {
            const createDetails = formatResponse(result);
            if (!createDetails.created) {
              return createDetails;
            }
            const statusId = createDetails.id;
            const req2 = {
              url: configs.API_V2 + configs.ORDER_DETAIL_URL_V2 + statusId,
              headers: {
                Authorization: 'Bearer ' + token,
                'content-type': 'application/json'
              }
            };

            requestor(req2)
              .then(result => {
                resolve(
                  success({
                    jsonrpc: '2.0',
                    result: formatFiatResponse(result, statusId, token),
                    id: body.id
                  })
                );
              })
              .catch(err => {
                reject(error(err, '3'));
              });
          })
          .catch(err => {
            reject(error(err, '2'));
          });
      })
      .catch(err => {
        reject(error(err, '1'));
      });;

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
    console.log(body); // todo remove dev item
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
