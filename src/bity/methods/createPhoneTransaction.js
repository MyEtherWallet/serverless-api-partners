import configs from "../config";
import request from "../../request";
import { error, success } from "../../response";
const formatResponse = order => {
  return {
    phone_token: encryptor.encrypt(
      order.headers['Location'] // TODO fit regex to correctly match the returned content
        .match(/\d/g)
        .splice(1)
        .join("")
    ),
    success: order.statusCode === 201
  };
};

export default body => {
  return new Promise((resolve, reject) => {
    if (
      !configs.orderValues[body.params.pair] ||
      !configs.orderValues[body.params.pair].active
    ) {
      return reject(error("Not supported", body.id));
    }
    const phoneToken = encryptor.decrypt(body.params.phoneToken);
    const req = {
      url: configs.API_URL + configs.ORDER_PATH,
      headers: {  'X-Phone-Token' : phoneToken }
    };
    const reqBody = {
      input: {
        amount: body.params.amount,
        currency: body.params.fromCurrency,
        type: 'crypto_address',
        crypto_address: body.params.address
      },
      output: {
        currency: body.params.toCurrency,
        type: 'bank_account',
        iban: body.params.iban,
        bic_swift: body.params.bic_swift,
        aba_number: body.params.aba_number,
        sort_code: body.params.sort_code,
        owner: {
          name: body.params.name,
          address: body.params.address,
          address_complement: body.params.address_complement,
          zip: body.params.zip,
          city: body.params.city,
          state: body.params.state,
          country: body.params.country
        }
      }
    };
    request(req, reqBody)
      .then(result => {
        resolve(
          success({
            jsonrpc: "2.0",
            result: formatResponse(result),
            id: body.id
          })
        );
      })
      .catch(err => {
        reject(error(err, ""));
      });
  });
};
