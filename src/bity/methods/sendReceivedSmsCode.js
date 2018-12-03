import configs from "../config";
import request from "../../request";
import { error, success } from "../../response";
const formatResponse = order => {
  return {
    phone_token: order.phone_token
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
      url: configs.EXIT_TO_FIAT_API_URL + configs.EXIT_TO_FIAT_LOGIN_URL,
      headers: { 'X-Phone-Token' : body.params.phoneToken ,Authorization: "Bearer " + configs.BITY_TOKEN }
    };
    const reqBody = {
      phone_number: '+' + body.params.tan
    };
    request(req, reqBody)
      .then(result => {
        resolve(
          success({
            jsonrpc: "2.0",
            result: result.statusCode === 204,
            id: body.id
          })
        );
      })
      .catch(err => {
        reject(error(err, ""));
      });
  });
};
