import configs from "../config";
import request from "../../request";
import { error, success } from "../../response";
import SimpleEncryptor from "simple-encryptor";
const encryptor = new SimpleEncryptor(configs.encryptionKey);
const formatResponse = order => {
  return {
    id: encryptor.encrypt(
      order.resource_uri
        .match(/\d/g)
        .splice(1)
        .join("")
    ),
    amount: order.amount,
    payment_address: order.payment_url,
    payment_amount: order.payment_amount,
    reference: order.reference,
    status: order.status,
    validFor: 600,
    timestamp_created: order.timestamp_created + "Z",
    input: {
      amount: order.inputtransactions[0].amount,
      currency: order.inputtransactions[0].currency,
      reference: order.inputtransactions[0].reference,
      status: order.inputtransactions[0].status
    },
    output: {
      amount: order.outputtransactions[0].amount,
      currency: order.outputtransactions[0].currency,
      reference: order.outputtransactions[0].reference,
      status: order.outputtransactions[0].status
    }
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
    const req = {
      url: configs.API_URL + configs.ORDER_PATH,
      headers: { Authorization: "Bearer " + configs.BITY_TOKEN, 'content-type': 'application/json' }
    };
    const reqBody = {
      amount: body.params.amount,
      pair: body.params.pair,
      amount_mode:
        configs.orderValues[body.params.pair].amount_mode[body.params.mode],
      category: configs.orderValues[body.params.pair].category,
      currency: configs.orderValues[body.params.pair].currency,
      payment_method: configs.orderValues[body.params.pair].payment_method,
      crypto_address: body.params.destAddress
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
