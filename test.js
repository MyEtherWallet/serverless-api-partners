// Way to test functions locally

// AWS_PROFILE=claudia babel-node test.js

// EXAMPLE
// Note: if you're using import, use babel-node instead of just node.
// import ipfs from './src/ipfs/index.js';

// ipfs({
//   "body": {
//       "method": "getUploadUrl",
//       // "hash": "44df417a-8a9c-467f-aae6-53ab14022912"
//     }
// }).then(response=> {
//   console.log(response)
// }).catch(console.log)