import configs from "../config";
import request from "../../request";
import { error, success } from "../../response";
import SimpleEncryptor from "simple-encryptor";
const encryptor = new SimpleEncryptor(configs.encryptionKey);


const formatResponse = response => {
  return {
    status: response.legacy_status,
    timestamp_created: response.timestamp_created + "Z",
    timestamp_awaiting_payment_since: response.timestamp_awaiting_payment_since,
    timestamp_executed: response.timestamp_executed,
    timestamp_payment_received: response.timestamp_payment_received,
    payerAddress: response.input.crypto_address,
    paymentAddress: response.payment_details.crypto_address,
    payment_amount: response.input.amount,
    input: {
      amount: response.input.amount,
      currency: response.input.currency
    },
    output: {
      amount: response.output.amount,
      currency: response.output.currency
    }
  };
};

export default body => {
  return new Promise((resolve, reject) => {
    const orderid = body.params.orderId;
    const token = encryptor.decrypt(body.params.token);
    const req = {
      url: configs.API_V2 + configs.ORDER_DETAIL_URL_V2 + orderid,
      method: "GET",
      headers: {Authorization: "Bearer " + token }
    };
    const reqBody = {};
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