import configs from "../config";
import request from "../../request";
import { error, success } from "../../response";
import SimpleEncryptor from "simple-encryptor";
const encryptor = new SimpleEncryptor(configs.encryptionKey);
const formatResponse = order => {

  return {
    phone_token: encryptor.encrypt(
      order.phone_token
    ),
  };
};
export default body => {
  return new Promise((resolve, reject) => {
    if (
      !configs.fiatValues[body.params.pair] ||
      !configs.fiatValues[body.params.pair].active
    ) {
      return reject(error("Not supported", body.id));
    }

    const req = {
      url: configs.API_URL + configs.EXIT_TO_FIAT_LOGIN_URL
    };
    const reqBody = {
      phone_number: body.params.phoneNumber
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
        reject(error(err, body.params));
      });
  });
};
