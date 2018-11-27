import configs from "../config";
import request from "../../request";
import { error, success } from "../../response";
import SimpleEncryptor from "simple-encryptor";
const encryptor = new SimpleEncryptor(configs.encryptionKey);
const formatOrder = order => {
  return {
    status: order.status,
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
    const orderid = encryptor.decrypt(body.params[0]);
    const req = {
      url: configs.API_URL + configs.ORDER_PATH + orderid,
      method: "GET",
      headers: { Authorization: "Bearer " + configs.BITY_TOKEN }
    };
    const reqBody = {};
    request(req, reqBody)
      .then(result => {
        resolve(
          success({
            jsonrpc: "2.0",
            result: formatOrder(result),
            id: body.id
          })
        );
      })
      .catch(err => {
        reject(error(err, ""));
      });
  });
};
