import { error, success } from "../response";
import mpConfig from "./config";
import fetch from "node-fetch";

export default (req) => {
  const hash = v4();
  return new Promise((resolve, reject) => {
    if (req.body) {
      reject(error("Can't understand API call"));
    } else {
      reject(error("No IPFS attached"));
    }
  });
};
