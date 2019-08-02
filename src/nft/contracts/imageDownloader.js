import request from "request";
import api from "../../api";
import { error } from "../../response";

export default path => {
  return new Promise((resolve, reject) => {
    request(
      {
        method: "GET",
        url: path,
        encoding: null
      },
      (error, response, body) => {
        if (error) reject(error);
        else resolve(body.toString("base64"));
      }
    );
  });
};
