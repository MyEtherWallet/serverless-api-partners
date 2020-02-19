import configs from '../config';
import statusRequest from '../bityRequestOnlyStatusResponse';
import {error, success} from '../../response';
import SimpleEncryptor from 'simple-encryptor';
import request from 'request';
const encryptor = new SimpleEncryptor(configs.encryptionKey);

const formatResponse = order => {
  console.log(order.statusCode); // todo remove dev item
  console.log(order.headers); // todo remove dev item
  const statusId = order.headers['location'].replace('/api/v2/orders/', '').replace('/v2/orders/', '');
  return {
    id: encryptor.encrypt(statusId),
    created: order.statusCode === 201
  };
};

const formatFiatResponse = (order, statusId, token) => {
  const orderJson = JSON.parse(order);
  return {
    created: true,
    requiresSigning: false,
    id: encryptor.encrypt(statusId),
    reference: encryptor.encrypt(statusId),
    token: token ? encryptor.encrypt(token) : '',
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


const createPair = (orderDetails) => {
  return orderDetails.input.currency + orderDetails.currency;
};

const requestor = (req) => {
  var options = {
    url: req.url,
    headers: req.headers,
    method: 'GET'
  };

  return statusRequest(options, 'yes');
};

 const wrappedRequest = (req, data) => {
  var options = {
    url: req.url,
    headers: req.headers,
    method: req.method || "POST",
    body: JSON.stringify(data)
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
};

const getToken = () => {
  return new Promise((resolve, reject) => {
    let options = {
      'method': 'POST',
      'url': 'https://connect.bity.com/oauth2/token',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        'grant_type': 'client_credentials',
        'scope': 'https://auth.bity.com/scopes/exchange.client-history',
        'client_id': configs.BITY_OAUTH_CLIENT_ID,
        'client_secret': configs.BITY_OAUTH_CLIENT_SECRET
      }
    };
    return request(options, function (error, response) {
      if (error) throw new Error(error);
      resolve(JSON.parse(response.body).access_token);
    });
  });
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
            const statusId = encryptor.decrypt(createDetails.id);
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
            reject(error(err, ''));
          });
      });

  });
};


export default body => {
  const ctf = () => {
    const pair = createPair(body.params.orderDetails);
    if (
      !configs.fiatValues[pair] ||
      !configs.fiatValues[pair].active
    ) {
      return false;
    }
    return true;
  };
  const ctc = () => {
    const pair = createPair(body.params.orderDetails);

    if (
      !configs.orderValues[pair] ||
      !configs.orderValues[pair].active
    ) {
      return false;
    }
    return true;
  };

  if (!ctf() && !ctc()) {
    error(body.params);
    return Promise.reject(error('Not supported', body.id));
  }

  if (ctf()) {
    return cryptoToFiat(body);

  } else {
    error(body.params);
    return Promise.reject(error('Not supported', body.id));
  }
};
