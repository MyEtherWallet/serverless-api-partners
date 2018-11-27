require("dotenv").config();
export default {
  CHANGELLY_SECRET: process.env.CHANGELLY_SECRET || "",
  CHANGELLY_API_KEY: process.env.CHANGELLY_API_KEY || "",
  API_URL: "https://api.changelly.com/"
};
