require("dotenv").config();
export default {
  PUB_KEY: process.env.MOONPAY_PUB_KEY || "",
  SECRET_KEY: process.env.MOONPAY_SECRET_KEY || "",
  WEBHOOK_KEY: process.env.MOONPAY_WEBHOOK_KEY || "",
};
