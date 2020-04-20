require("dotenv").config();
export default {
  PROXY_CONTRACT_ADDRESS: process.env.DEX_AG_PROXY_CONTRACT_ADDRESS || "",
  API_URL: "https://api-v2.dex.ag/"
};
