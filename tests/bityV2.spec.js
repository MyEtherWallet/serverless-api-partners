import bity from '../src/bity';
import { consoleLogger } from '../src/loggers';
import Web3 from 'web3'

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
            signature: '0x5ff250e1a7712eae9950b4630e471d68929261ead39481cb718bc9eeb460ca9e591f4d5fba0ad6c955f301bf7a91b8d6c4f3c0c0d5532055ac74e9ede632beed00',
            signature_submission_url: '/v2/orders/651c4003-e77d-464a-9876-9f8c7a509b75/signature'
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
  });

});
