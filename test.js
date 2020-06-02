// Way to test functions locally

// AWS_PROFILE=claudia babel-node test.js

// EXAMPLE
// Note: if you're using import, use babel-node instead of just node.
// import ipfs from './src/ipfs/index.js';

// ipfs({
//   "body": {
//       "method": "uploadComplete",
//       "hash": "87a8febf-ab45-4b07-8c6a-dd3b0ad2d3da"
//     }
// }).then(response=> {
//   console.log(response)
// }).catch(console.log)