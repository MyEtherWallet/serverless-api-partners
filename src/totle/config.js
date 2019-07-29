require("dotenv").config();
export default {
  EXIT_TO_FIAT_API_URL: 'https://bity.com',
  TOTLE_API_KEY: process.env.TOTLE_API_KEY || '',
  SUPPORTED: '/tokens',
  SWAP: '/swap',
  API_URL_ETH: 'https://api.totle.com'
};
