// import API from "claudia-api-builder";

import api from "./api";
import changelly from "./changelly";
import bity from "./bity";
import kyber from './kyber'
import nft from './nft'

import { cloudWatchLogger } from "./loggers";

api.post("/changelly", request => {
  const cloudwatch = new cloudWatchLogger("CHANGELLY");
  return changelly(request, cloudwatch);
});

api.post("/bity", request => {
  const cloudwatch = new cloudWatchLogger("BITY");
  return bity(request, cloudwatch);
});

api.post("/kyber", request => {
  const cloudwatch = new cloudWatchLogger("KYBER");
  return kyber(request, cloudwatch);
});

// api.get("/nft", request => {
//   const cloudwatch = new cloudWatchLogger("NFT");
//   return nft(request, cloudwatch);
// });

api.get("/nft", (request) => {
  const cloudwatch = new cloudWatchLogger("NFT");
  return nft(request, cloudwatch);
});

// api.get("/nft_proxy", (request) => {
//   const cloudwatch = new cloudWatchLogger("NFT");
//   return nft(request, cloudwatch);
// }, {
//   requestContentHandling: 'CONVERT_TO_BINARY'
// });

api.get("/", () => "MyEtherWallet Partners API");

module.exports = api;
