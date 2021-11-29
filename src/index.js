import api from "./api";
import changelly from "./changelly";
import bity from "./bity";
import kyber from "./kyber";
import dexAg from "./dexAg";
import proxy from "./proxy";
import ipfs from "./ipfs";
import moonpay from "./moonpay";
import { cloudWatchLogger } from "./loggers";

api.post("/changelly", (request) => {
  const cloudwatch = new cloudWatchLogger("CHANGELLY");
  return changelly(request, cloudwatch);
});

api.post("/bity", (request) => {
  const cloudwatch = new cloudWatchLogger("BITY");
  return bity(request, cloudwatch);
});

api.post("/kyber", (request) => {
  const cloudwatch = new cloudWatchLogger("KYBER");
  return kyber(request, cloudwatch);
});

api.post("/dexag", (request) => {
  const cloudwatch = new cloudWatchLogger("DEXAG");
  return dexAg(request, cloudwatch);
});

api.get("/proxy", (request) => {
  const cloudwatch = new cloudWatchLogger("PROXY");
  return proxy(request, cloudwatch);
});

api.post("/ipfs", (request) => {
  const cloudwatch = new cloudWatchLogger("IPFS");
  return ipfs(request, cloudwatch);
});

api.post("/moonpay", (request) => {
  const cloudwatch = new cloudWatchLogger("IPFS");
  return moonpay(request, cloudwatch);
});

api.get("/", () => "MyEtherWallet Partners API");

module.exports = api;
