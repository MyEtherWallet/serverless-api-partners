import bity from '../src/bity';
import {consoleLogger} from '../src/loggers';

const logger = new consoleLogger('BITY');
describe('Bity API', () => {

  // describe('Bity API  - crypto to crypto', () => {
  //   let orderId = null;
  //   let recvAmt = 0;
  //
  //   test('get estimate', async done => {
  //     expect.assertions(4);
  //     const details = {
  //       pair: 'ETHCHF',
  //       'amount': '0.1',
  //       'fromCurrency': 'ETH',
  //       'toCurrency': 'BTC'
  //
  //     };
  //     bity(
  //       {
  //         body: {
  //           jsonrpc: '2.0',
  //           method: 'getEstimate',
  //           params: details,
  //           id: 85
  //         }
  //       },
  //       logger
  //     )
  //       .then(response => {
  //         const result = response.response.result;
  //         console.log(result); // todo remove dev item
  //         expect(result.input.currency).toBe('ETH');
  //         expect(result.input.minimum_amount).toEqual(expect.anything());
  //         expect(result.output.currency).toBe('BTC');
  //         recvAmt = result.output.amount;
  //         orderId = result.status_address;
  //         expect(response.response.id).toBe(85);
  //         done();
  //       })
  //       .catch(console.log);
  //   });
  //
  //   test('create order', async done => {
  //     expect.assertions(5);
  //     const details = {
  //       pair: 'ETHBTC',
  //       orderDetails: {
  //         'input': {
  //           'amount': '0.1',
  //           'currency': 'ETH',
  //           'type': 'crypto_address',
  //           'crypto_address': '0xe51dDAa1B650c26B62fCA2520cdC2c60cE205F75'
  //         },
  //         'output': {
  //           'currency': 'BTC',
  //           'type': 'crypto_address',
  //           'crypto_address': '1Bf5Ng3uH2gRWbrcU3HegqMTfQpa3GSYVW'
  //         }
  //       }
  //
  //     };
  //     console.log(details); // todo remove dev item
  //     bity(
  //       {
  //         body: {
  //           jsonrpc: '2.0',
  //           method: 'createOrder',
  //           params: details,
  //           id: 85
  //         }
  //       },
  //       logger
  //     )
  //       .then(response => {
  //         console.log('response', response); // todo remove dev item
  //         const result = response.response.result;
  //         expect(result.created).toBe(true);
  //         expect(result.id).toEqual(expect.anything());
  //         expect(result.message_to_sign).toEqual(expect.anything());
  //         expect(result.signature_submission_url).toEqual(expect.anything());
  //         orderId = result.status_address;
  //         expect(response.response.id).toBe(85);
  //         done();
  //       })
  //       .catch(console.log);
  //   });
  // })

  describe('Bity API - crypto to fiat', () => {
    let orderId = null;
    let accessToken = null;
    // const recvAmt = 0;

    test('get estimate ', async done => {
      expect.assertions(4);
      const details = {
        pair: 'ETHCHF',
        'amount': '0.1',
        'fromCurrency': 'ETH',
        'toCurrency': 'CHF'

      };
      bity(
        {
          body: {
            jsonrpc: '2.0',
            method: 'getEstimate',
            params: details,
            id: 85
          }
        },
        logger
      )
        .then(response => {
          const result = response.response.result;
          expect(result.input.currency).toBe('ETH');
          expect(result.input.minimum_amount).toEqual(expect.anything());
          expect(result.output.currency).toBe('CHF');
          orderId = result.status_address;
          expect(response.response.id).toBe(85);
          done();
        })
        .catch(console.log);
    });
    test('create order', async done => {
      expect.assertions(3);
      const details = {
        pair: 'ETHCHF',
        // phoneToken: '', // need to supply a valid phone token to run test
        orderDetails: {
          'email': 'user@MyEtherWallet.com',
          "input": {
            "amount": "0.5",
            "crypto_address": "0xf35074bbd0a9aee46f4ea137971feec024ab7048",
            "currency": "ETH",
            "type": "crypto_address"
          },
          "bic_swift": "XXXXCHXXXXX",
          "currency": "CHF",
          "iban": "CH3600000000000000000",
          "address": "Brückenstrasse 12",
          "city": "Bern",
          "country": "CH",
          "name": "John Doe",
          "zip": "3000"
        }

      };
      bity(
        {
          body: {
            jsonrpc: '2.0',
            method: 'createOrder',
            params: details,
            id: 85
          }
        },
        logger
      )
        .then(response => {
          const result = response.response.result;
          accessToken = result.token;
          orderId = result.id;
          expect(result.created).toBe(true);
          expect(result.id).toEqual(expect.anything());
          expect(response.response.id).toBe(85);
          done();
        })
        .catch(console.log);
    }, 10000);
    test('get exit order details', async done => {
      expect.assertions(2);
      const details = {
        // pair: 'ETHCHF',
        // phoneToken: '', // need to supply a valid phone token to run test
        detailsUrl: orderId, // || '51e66e4b-de85-4369-a68b-0b84a339fdf5',
        token: accessToken
      };
      bity(
        {
          body: {
            jsonrpc: '2.0',
            method: 'getOrderDetails',
            params: details,
            id: 85
          }
        },
        logger
      )
        .then(response => {
          console.log(response); // todo remove dev item
          const result = response.response.result;
          expect(result).toEqual(expect.anything());
          expect(response.response.id).toBe(85);
          done();
        })
        .catch(console.log);
    }, 10000);
  })


});
