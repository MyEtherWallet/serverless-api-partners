import configs from "../config";
import request from "../../request";
import { error, success } from "../../response";
const formatResponse = order => {
  return {
    success: order.statusCode === 204
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
      url: configs.EXIT_TO_FIAT_API_URL + configs.EXIT_TO_FIAT_LOGIN_URL,
      headers: { 'X-Phone-Token' : phoneToken ,Authorization: "Bearer " + configs.BITY_TOKEN }
    };
    const reqBody = {
      phone_number: '+' + body.params.tan
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
