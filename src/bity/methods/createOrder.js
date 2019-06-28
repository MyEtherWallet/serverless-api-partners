import configs from '../config';
import request from '../bityRequestOnlyStatusResponse';
import { error, success } from '../../response';
import SimpleEncryptor from 'simple-encryptor';

const encryptor = new SimpleEncryptor(configs.encryptionKey);
const formatResponse = order => {
  const statusId = order.headers['location'].replace('/api/v2/orders/', '').replace('/v2/orders/', '');
  return {
    status_address: statusId, //encryptor.encrypt(statusId),
    created: order.statusCode === 201
  };
};

const createPair = (orderDetails) => {
  return orderDetails.input.currency + orderDetails.output.currency;
};

export default body => {
  return new Promise((resolve, reject) => {
    const pairOptions = [...Object.keys(configs.orderValues), ...Object.keys(configs.fiatValues)];
    let notSupported = true;
const pair = createPair(body.params.orderDetails);
    if(pairOptions.includes(pair)){
      if(configs.orderValues[pair]){
        notSupported = !configs.orderValues[pair].active
      } else if(configs.fiatValues[pair]){
        notSupported = !configs.fiatValues[pair].active
      }
    }

    if (notSupported) {
      error(body.params);
      return reject(error('Not supported', body.id));
    }
    const req = {
      url: configs.API_V2 + configs.CREATE_ORDER_V2,
      headers: {
        Authorization: 'Bearer ' + configs.BITY_TOKEN
      }
    };
    const reqBody = body.params.orderDetails;

    request(req, reqBody)
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
        reject(error(err, ''));
      });
  });
};
