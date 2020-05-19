require("dotenv").config();
export default {
  TEMPORAL_USERNAME: process.env.TEMPORAL_USERNAME || "",
  TEMPORAL_PW: process.env.TEMPORAL_PW || "",
  API_LOGIN_URL: "https://api.temporal.cloud/v2/auth/login",
  API_UPLOAD_URL: "https://api.temporal.cloud/v2/ipfs/public/file/add"
};
