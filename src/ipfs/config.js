require("dotenv").config();
export default {
  PINATA_API_KEY: process.env.PINATA_API_KEY || "",
  PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY || "",
  REGION: "us-west-2",
  BUCKET_NAME: "mew-ipfs-bucket",
  UPLOAD_METHOD: "getUploadUrl",
  UPLOAD_COMPLETE: "uploadComplete",
  IPFS_URL: "https://api.pinata.cloud/pinning/pinFileToIPFS",
};
