import { error, success } from "../response";
import changellyConfigs from "./config";
import allowedMethods from "./validMethods";
import request from "./request";
import crypto from "crypto";
export default (req, logger) => {
  return new Promise((resolve, reject) => {
    if (req.body) {
      let body = req.body;
      if (logger) logger.process(body);
      if (Array.isArray(body)) {
        reject(error(`Invalid Request - ${body}`));
      } else {
        if (allowedMethods.indexOf(body.method) == -1)
          reject(error(`Invalid Method - ${body.method}`));
        else {
          const req = {
            url: changellyConfigs.API_URL,
            headers: {
              "api-key": changellyConfigs.CHANGELLY_API_KEY,
              sign: crypto
                .createHmac("sha512", changellyConfigs.CHANGELLY_SECRET)
                .update(JSON.stringify(body))
                .digest("hex")
            }
          };
          request(req, body)
            .then(result => {
              resolve(success(result));
            })
            .catch(err => {
              reject(error(err, ""));
            });
        }
      }
    }
  });
};
