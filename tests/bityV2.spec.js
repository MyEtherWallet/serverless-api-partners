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
  test('Create new order from bity', async done => {
    console.log(wallet.address); // todo remove dev item

    expect.assertions(0);
    bity(
      {
        body: {
          jsonrpc: '2.0',
          method: 'createTransactionV2',
          params: {
            pair: 'BTCETH',
              "input": {
                "amount": "0.1",
                "crypto_address": "1Bf5Ng3uH2gRWbrcU3HegqMTfQpa3GSYVW",
                "currency": "BTC",
                // "type": "crypto_address"
              },
              "output": {
                "crypto_address": "0x7676E10eefc7311970A12387518442136ea14D81",
                "currency": "ETH",
                // "type": "crypto_address"
              },
            },
          id: 83
        }
      },
      logger
    )
      .then( async response => {
        const result = response.response.result;

        // orderId = result.id;
        // const toSign = result.messageToSign.body.toString();
        // console.log(toSign); // todo remove dev item
        // signature = wallet.sign(toSign).signature;
        // signature = await web3.eth
        //   .sign(toSign, '0x3aA38F7dc0E8b5513b691b95e8Db34C1Afe6ff30');
        // submitUrl = result.messageToSign.signature_submission_url;
        // web3.eth.personal.getAccounts()
        //   .then(accounts => {
        //     console.log(accounts)
        //     done();
        //
        //   })

        done();
      })
      .catch(console.log);
  }, 10000);

});
