import bity from '../src/bity';
import { consoleLogger } from '../src/loggers';

// add a web3 instance here to sign the message in the test env.
const logger = new consoleLogger('BITY');
describe('Bity API', () => {
  let orderId = null;
  test('Create new order from bity', async done => {
    expect.assertions(0);
    bity(
      {
        body: {
          jsonrpc: '2.0',
          method: 'createTransaction',
          params: {
            "input": {
              "amount": "0.1",
              // "crypto_address": "1DECAF2uSpFTP4L1fAHR8GCLrPqdwdLse9",
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
      .then(response => {
        const result = response.response.result;
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
  // test('Create new order from bity', async done => {
  //   expect.assertions(0);
  //   bity(
  //     {
  //       body: {
  //         jsonrpc: '2.0',
  //         method: 'sendSignedMessage',
  //         params: {
  //           signature: '0x7ed6fae3967e3b52a308f993137b2ea6d39621eacb48272dc8769e457772a50d4d4819495835de5103e4cb03cb28964518469750540b562855c125fe17375ea501',
  //           signature_submission_url: '/v2/orders/ceab09e2-b59e-41e5-a076-79a891a15d67/signature'
  //         },
  //         id: 83
  //       }
  //     },
  //     logger
  //   )
  //     .then(response => {
  //       const result = response.response.result;
  //       console.log(result); // todo remove dev item
  //       orderId = result.id;
  //       // expect(result.amount).toBe(0.5);
  //       // expect(result).toBe(expect.anything());
  //       // expect(result.input.currency).toBe('ETH');
  //       // expect(result.output.currency).toBe('BTC');
  //       // expect(response.response.id).toBe(83);
  //       done();
  //     })
  //     .catch(console.log);
  // });

});
