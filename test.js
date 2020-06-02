// Way to test functions locally

// AWS_PROFILE=claudia babel-node test.js

// EXAMPLE
// Note: if you're using import, use babel-node instead of just node.
// import ipfs from './src/ipfs/index.js';

// ipfs({
//   "body": {
//       "method": "uploadComplete",
//       "hash": "026cad7e-29d8-416f-a5c0-f6f05e8706c9"
//     }
// }).then(response=> {
//   console.log(response)
// }).catch(console.log)