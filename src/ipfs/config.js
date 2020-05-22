require("dotenv").config();
export default {
  TEMPORAL_PW: process.env.TEMPORAL_PW || "",
  TEMPORAL_USERNAME: process.env.TEMPORAL_USERNAME || "",
  API_LOGIN_URL: "https://api.temporal.cloud/v2/auth/login",
  API_UPLOAD_URL: "https://api.temporal.cloud/v2/ipfs/public/file/add",
  REGION: "us-west-2",
  BUCKET_NAME: "mew-ipfs-bucket",
  UPLOAD_METHOD: "getUploadUrl",
  UPLOAD_COMPLETE: "uploadComplete"
};
