import bity from '../src/bity';
import { consoleLogger } from '../src/loggers';
import Web3 from 'web3'
import {BityApiClient} from '@bity/api'
import {Order} from '@bity/models'
import configs from '../src/bity/config.js';
import fetch from 'node-libs-browser'
// add a web3 instance here to sign the message in the test env.

const web3 = new Web3('https://mainnet.infura.io/v3/c9b249497d074ab59c47a97bdfe6b401');


const wallet = web3.eth.accounts.wallet.add('9b11121e377bfde0375bfc1d6726f156bdceec1ca2e2e6b4ce877777f3a2c1be');
const logger = new consoleLogger('BITY');
let signature = '';
let submitUrl = '';
describe('Bity API', () => {
  let orderId = null;
  test('submit sig to bity', async done => {
    expect.assertions(0);
    bity(
      {
        body: {
          jsonrpc: '2.0',
          method: 'sendSignedMessageV2',
          params: {
            signature: '0x70c97fb4a93dad942bb946930e9fee83aaf7414542212016a204f05ca3150c4b0a4e5d8080e405d9e0cbb17da8634e033313d92421b74c3370cf2f0a4af3cf2b01',
            signature_submission_url: '/v2/orders/15151031-ccdd-46e1-a750-553297dec8fe/signature',
            token: 'pOQWe1p64YJgoZ3cypQLleXY-BQJ1E0hYaqtSQiSfss.j-Lm51zw4AiXxetQcweU5MOdFdRujii5gksxaUYq3Uo'
          },
          id: 83
        }
      },
      logger
    )
      .then(response => {
        const result = response.response.result;
        console.log("=================="); // todo remove dev item
        console.log(result); // todo remove dev item
        orderId = result.id;
        // expect(result.amount).toBe(0.5);
        // expect(result).toBe(expect.anything());
        // expect(result.input.currency).toBe('ETH');
        // expect(result.output.currency).toBe('BTC');
        // expect(response.response.id).toBe(83);
        done();
      })
      .catch(console.log);
  },10000);


});
