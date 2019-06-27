import bity from '../src/bity';
import {consoleLogger} from '../src/loggers';

const logger = new consoleLogger('BITY');
describe('Bity API', () => {
  let orderId = null;
  let recvAmt = 0;

  test('get estimate', async done => {
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
        console.log(result); // todo remove dev item
        expect(result.input.currency).toBe('ETH');
        expect(result.input.minimum_amount).toEqual(expect.anything());
        expect(result.output.currency).toBe('CHF');
        recvAmt = result.output.amount;
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
      phoneToken: '', // need to supply a valid phone token to run test
      orderDetails: {
        'email': 'steveM@MyEtherWallet.com',
        'input': {
          'amount': '0.1',
          'currency': 'ETH',
          'type': 'crypto_address',
          'crypto_address': '0xe51dDAa1B650c26B62fCA2520cdC2c60cE205F75'
        },
        'output': {
          'currency': 'CHF',
          'type': 'bank_account',
          'iban': 'CH980000MEW0000000009',
          'bic_swift': 'TESTCHBEXXX',
          'aba_number': '',
          'sort_code': '',
          'owner': {
            'name': 'FirstName LastName',
            'address': 'Test address',
            'address_complement': '',
            'zip': '2000',
            'city': 'los angeles',
            'state': '',
            'country': 'US'
          }
        }
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
        console.log(response); // todo remove dev item
        const result = response.response.result;
        expect(result.created).toBe(true);
        expect(result.status_address).toEqual(expect.anything());
        orderId = result.status_address;
        expect(response.response.id).toBe(85);
        done();
      })
      .catch(console.log);
  });
  test('get exit order details', async done => {
    expect.assertions(2);
    const details = {
      pair: 'ETHCHF',
      // phoneToken: '', // need to supply a valid phone token to run test
      detailsUrl: orderId || '51e66e4b-de85-4369-a68b-0b84a339fdf5'
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
        const result = response.response.result;
        expect(result).toEqual(expect.anything());
        expect(response.response.id).toBe(85);
        done();
      })
      .catch(console.log);
  });
});
