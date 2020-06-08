require("dotenv").config();
export default {
  TEMPORAL_PW: process.env.TEMPORAL_PW || "",
  TEMPORAL_USERNAME: process.env.TEMPORAL_USERNAME || "",
  API_LOGIN_URL: "https://api.temporal.cloud/v2/auth/login",
  API_UPLOAD_HOST: "api.ipfs.temporal.cloud",
  API_UPLOAD_PROTOCOL: "https",
  API_UPLOAD_PORT: "443",
  REGION: "us-west-2",
  BUCKET_NAME: "mew-ipfs-bucket",
  UPLOAD_METHOD: "getUploadUrl",
  UPLOAD_COMPLETE: "uploadComplete"
};
