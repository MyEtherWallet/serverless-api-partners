import { error } from "../response";
import allowedMethods from "./validMethods";
import { createTransaction, getStatus } from "./methods";
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
          if (body.method === "createTransaction")
            createTransaction(body)
              .then(resolve)
              .catch(reject);
          else if (body.method === "getStatus")
            getStatus(body)
              .then(resolve)
              .catch(reject);
          else reject(error("unknown error"));
        }
      }
    }
  });
};
