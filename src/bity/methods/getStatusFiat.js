import configs from "../config";
import request from "../../request";
import { error, success } from "../../response";
import SimpleEncryptor from "simple-encryptor";
const encryptor = new SimpleEncryptor(configs.encryptionKey);

const formatResponse = response => {
  return {
    status: response.legacy_status,
    timestamp_created: response.timestamp_created + "Z",
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
    const orderid = encryptor.decrypt(body.params.orderId);
    const phoneToken = encryptor.decrypt(body.params.phoneToken);
    const req = {
      url: configs.API_URL + configs.ORDER_DETAIL_URL + orderid,
      method: "GET",
      headers: {'X-Phone-Token': phoneToken, Authorization: "Bearer " + configs.BITY_TOKEN }
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
