import configs from "../config";
import request from "../../request";
import { error, success } from "../../response";
import SimpleEncryptor from "simple-encryptor";
// const encryptor = new SimpleEncryptor(configs.encryptionKey);
const formatResponse = order => {
  return order // TODO ask about
  // return {
  //   id: encryptor.encrypt(
  //     order.resource_uri
  //       .match(/\d/g)
  //       .splice(1)
  //       .join("")
  //   ),
  //   amount: order.amount,
  //   payment_address: order.payment_url,
  //   payment_amount: order.payment_amount,
  //   reference: order.reference,
  //   status: order.status,
  //   validFor: 600,
  //   timestamp_created: order.timestamp_created + "Z",
  //   input: {
  //     amount: order.inputtransactions[0].amount,
  //     currency: order.inputtransactions[0].currency,
  //     reference: order.inputtransactions[0].reference,
  //     status: order.inputtransactions[0].status
  //   },
  //   output: {
  //     amount: order.outputtransactions[0].amount,
  //     currency: order.outputtransactions[0].currency,
  //     reference: order.outputtransactions[0].reference,
  //     status: order.outputtransactions[0].status
  //   }
  // };
};
export default body => {
  return new Promise((resolve, reject) => {
    if (
      !configs.orderValues[body.params.pair] ||
      !configs.orderValues[body.params.pair].active
    ) {
      return reject(error("Not supported", body.id));
    }
    const req = {
      url: configs.API_URL + configs.ORDER_PATH,
      headers: {  'X-Phone-Token' : body.params.phoneToken, Authorization: "Bearer " + configs.BITY_TOKEN }
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
