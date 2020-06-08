import { error, success } from "../response";
import { v4 } from "uuid";
import AdmZip from "adm-zip";
import ipfsConfig from "./config";
import AWS from "aws-sdk";
import fs from "fs";
import IpfsHttpClient from "ipfs-http-client";
import fetch from "node-fetch";
const { globSource } = IpfsHttpClient;
const PATH = "/tmp";
AWS.config.update({ region: ipfsConfig.REGION || "us-east-2" });
const s3 = new AWS.S3({
  signatureVersion: "v4",
});

function loginToTemporal(usr, pw) {
  return fetch(ipfsConfig.API_LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify({
      username: usr,
      password: pw,
    }),
  });
}

async function uploadToIpfs(resolve, reject, token, file, hash) {
  try {
    // unzip file
    fs.mkdirSync(`${PATH}/${hash}`, { recursive: true });

    const unzipped = new AdmZip(file);
    unzipped.extractAllTo(`${PATH}/${hash}`, true);
    const ipfs = IpfsHttpClient({
      host: ipfsConfig.API_UPLOAD_HOST,
      port: ipfsConfig.API_UPLOAD_PORT,
      protocol: ipfsConfig.API_UPLOAD_PROTOCOL,
      headers: {
        authorization: `Bearer ${token.token}`,
        "X-Hold-Time": 24,
      },
    });

    const folderName = fs.readdirSync(`${PATH}/${hash}`);
    if (folderName.length > 0) {
      const file = await ipfs.add(
        globSource(`${PATH}/${hash}/${folderName[0]}`, { recursive: true })
      );
      for await (const f of file) {
        if (f.path === folderName[0]) {
          const cid = f.cid.toString();
          resolve(cid);
        }
      }
    } else {
      reject(error("Your uploaded file might be corrupted or empty!"));
    }
  } catch (e) {
    reject(error(e));
  }
}

export default (req, logger) => {
  const hash = v4();
  return new Promise((resolve, reject) => {
    const errorLogging = (err) => {
      if (logger) console.log("IPFS ERROR", err);
      if (logger) logger.errorReporter("ipfs");
      reject(error(err));
    };
    if (req.body) {
      if (req.body.method === ipfsConfig.UPLOAD_METHOD) {
        const s3Params = {
          Bucket: ipfsConfig.BUCKET_NAME,
          Fields: {
            key: `${hash}.zip`,
          },
          Conditions: [["content-length-range", 500, 52428800]],
        };
        s3.createPresignedPost(s3Params, (err, data) => {
          if (err) {
            errorLogging(err);
            return;
          }
          resolve(
            success({
              body: {
                signedUrl: data.url,
                fields: data.fields,
                hashResponse: hash,
              },
            })
          );
        });
      } else if (req.body.method === ipfsConfig.UPLOAD_COMPLETE) {
        const fileHash = req.body.hash;
        const s3Params = {
          Bucket: ipfsConfig.BUCKET_NAME,
          Key: `${fileHash}.zip`,
        };
        // get file from s3
        s3.getObject(s3Params)
          .promise()
          .then((data) => {
            try {
              // login to temporal
              const tokenPromise = loginToTemporal(
                ipfsConfig.TEMPORAL_USERNAME,
                ipfsConfig.TEMPORAL_PW
              )
                .then((tempLogin) => {
                  // upload files to ipfs
                  return tempLogin.json();
                })
                .catch((e) => {
                  reject(error(e));
                });
              tokenPromise
                .then((token) => {
                  uploadToIpfs(resolve, reject, token, data.Body, fileHash);
                })
                .catch((e) => {
                  reject(error(e));
                });
            } catch (e) {
              errorLogging(e);
            }
          })
          .catch((e) => {
            errorLogging(e);
          });
      } else {
        errorLogging("Can't understand API call");
      }
    } else {
      errorLogging("No IPFS attached");
    }
  });
};
