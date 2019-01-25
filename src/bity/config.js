require("dotenv").config();
export default {
  BITY_TOKEN: process.env.BITY_TOKEN || "",
  EXIT_TO_FIAT_API_URL: 'https://bity.com',
  EXIT_TO_FIAT_LOGIN_URL: '/api/v2/login/phone',
  EXIT_TO_FIAT_ORDERS_URL: '/api/v2/orders/phone',
  ESTIMATE: '/api/v2/orders/estimate',
  ORDER_DETAIL_URL: '/api/v2/orders/',
  API_URL: "https://bity.com",
  ORDER_PATH: "/api/v1/order/",
  pairs: ["ETHBTC", "REPBTC", "REPETH"],
  orderValues: {
    BTCREP: {
      category: "BUY_REP",
      payment_method: "BTCGATEWAY",
      amount_mode: [0, 2],
      currency: "",
      active: true
    },
    ETHREP: {
      category: "SELL_ETH",
      payment_method: "ETHGATEWAY",
      amount_mode: [1, 2],
      currency: "REP",
      active: true
    },
    ETHBTC: {
      category: "SELL_ETH",
      payment_method: "ETHGATEWAY",
      amount_mode: [1, 2],
      currency: "",
      active: true
    },
    BTCETH: {
      category: "BUY_ETH",
      payment_method: "BTCGATEWAY",
      amount_mode: [0, 2],
      currency: "",
      active: true
    },
    REPETH: {
      category: "BUY_ETH",
      payment_method: "ETHGATEWAY",
      amount_mode: [0, 2],
      currency: "REP",
      active: false
    },
    REPBTC: {
      category: "SELL_REP",
      payment_method: "BTCGATEWAY",
      amount_mode: [1, 2],
      currency: "",
      active: false
    }
  },
  fiatValues: {
    ETHCHF: {
      active: true
    },
    ETHEUR: {
      active: true
    },
    BTCCHF: {
      active: true
    },
    BTCEUR: {
      active: true
    }
  },
  encryptionKey: process.env.BITY_ENC_KEY || ""
};
