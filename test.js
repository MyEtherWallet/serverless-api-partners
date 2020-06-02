// Way to test functions locally

// AWS_PROFILE=claudia babel-node test.js

// EXAMPLE
// Note: if you're using import, use babel-node instead of just node.
// import ipfs from './src/ipfs/index.js';

// ipfs({
//   "body": {
//       "method": "uploadComplete",
//       "hash": "9de5bc01-16ea-4589-9623-b371df4ee226"
//     }
// }).then(console.log).catch(console.log)