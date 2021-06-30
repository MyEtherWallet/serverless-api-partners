import { error, success } from "../response";
import { v4 } from "uuid";
import AdmZip from "adm-zip";
import ipfsConfig from "./config";
import AWS from "aws-sdk";
import fs from "fs";
// import IpfsHttpClient from "ipfs-http-client";
import fetch from "node-fetch";

const recursive = require("recursive-fs");
const basePathConverter = require("base-path-converter");
const FormData = require("form-data");
const PATH = "/tmp";
AWS.config.update({ region: ipfsConfig.REGION || "us-east-2" });
const s3 = new AWS.S3({
  signatureVersion: "v4",
});

async function uploadToIpfs(resolve, reject, file, hash) {
  /**
   * read the uploaded file from S3,
   * unzip file and write it in a temporary folder,
   * upload to Pinata IPFS,
   * resolve hash
   */
  const url = ipfsConfig.IPFS_URL;
  const path = `${PATH}/${hash}`;
  fs.mkdirSync(path, { recursive: true });
  const unzipped = new AdmZip(file);
  unzipped.extractAllTo(path, true);

  recursive.readdirr(path, function (err, _, files) {
    if (err) {
      return reject(error(err));
    }
    let data = new FormData();
    files.forEach((file) => {
      data.append(`file`, fs.createReadStream(file), {
        filepath: basePathConverter(path, file),
      });
    });

    const metadata = JSON.stringify({
      name: "testname",
      keyvalues: {
        exampleKey: "exampleValue",
      },
    });
    data.append("pinataMetadata", metadata);

    fetch(url, {
      method: "POST",
      headers: {
        pinata_api_key: ipfsConfig.PINATA_API_KEY,
        pinata_secret_api_key: ipfsConfig.PINATA_SECRET_API_KEY,
      },
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        resolve(json.IpfsHash);
      })
      .catch(reject);
  });
}

export default (req) => {
  const hash = v4();
  return new Promise((resolve, reject) => {
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
            reject(error(err));
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
        console.log("getting object");
        // get file from s3
        s3.getObject(s3Params)
          .promise()
          .then((data) => {
            try {
              console.log("got body");
              uploadToIpfs(resolve, reject, data.Body, fileHash);
            } catch (e) {
              reject(error(e));
            }
          })
          .catch((e) => {
            reject(error(e));
          });
      } else {
        reject(error("Can't understand API call"));
      }
    } else {
      reject(error("No IPFS attached"));
    }
  });
};
