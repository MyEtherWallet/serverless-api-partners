require("dotenv").config();

const SUPPORTED_DEXES = [
  // 'uniswap', //ETH to Token -> OK, Token to Token ->
  'uniswap_v2',
  'bancor', //ETH to Token -> , Token to Token ->
  'kyber', //ETH to Token -> , Token to Token ->
  'zero_x', //ETH to Token -> OK , Token to Token ->  | (did have 1 eth-> token fail revert)
  'radar-relay', //ETH to Token -> , Token to Token ->
  'oasis', //ETH to Token -> OK, Token to Token ->  | (did have 1 eth-> token fail revert)
  'synthetix', //ETH to Token -> , Token to Token ->
  'curvefi', //ETH to Token -> , Token to Token ->
  'ag'
];

const EXCLUDED_DEXES_DEFAULT = [
  'uniswap'
]

const EXCLUDED_DEXES = () => {
  try {
    if (process.env.EXCLUDED_DEXES) {
      return process.env.EXCLUDED_DEXES.split(',');
    }
    return EXCLUDED_DEXES_DEFAULT;
  } catch (e) {
    return EXCLUDED_DEXES_DEFAULT;
  }
}

export default {
  SUPPORTED_DEXES,
  EXCLUDED_DEXES: EXCLUDED_DEXES(),
  PROXY_CONTRACT_ADDRESS: process.env.DEX_AG_PROXY_CONTRACT_ADDRESS || "",
  API_URL: process.env.DEX_AG_ENDPOINT || "https://api-v2.dex.ag/"
};
