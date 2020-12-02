import dexag from '../src/dexAg';
import {consoleLogger} from '../src/loggers';

const logger = new consoleLogger('DEXAG');
describe('DEX AG API', () => {
  let orderId = null;
  test('Get Price from DEX AG', async done => {
    expect.assertions(1);

    dexag(
      {
        body: {
          jsonrpc: '2.0',
          method: 'getPrice',
          params: {
            fromValue: 0.5,
            fromToken: 'ETH',
            toToken: 'BAT',
          },
          id: 83
        }
      },
      logger
    )
      .then(response => {
        const result = response.response.result;
        orderId = result.id;
        console.log(result); // todo remove dev item
        expect(Array.isArray(result)).toBe(true);
        // expect(result.status).toBe('OPEN');
        // expect(result.input.currency).toBe('ETH');
        // expect(result.output.currency).toBe('BTC');
        // expect(response.response.id).toBe(83);
        done();
      })
      .catch(console.log);
  }, 60000);
  test('createTransaction DEX AG', async done => {
    expect.assertions(2);
    dexag(
      {
        body: {
          jsonrpc: '2.0',
          method: 'createTransaction',
          params: {
            transactionParams: {
              additional: {source: 'dexag'},
              source: 'dexag',
              dex: 'kyber',
              fromAddress: '0x7676e10eefc7311970a12387518442136ea14d81',
              fromCurrency: 'ETH',
              fromValue: 1,
              maxValue: 0,
              maybeToken: true,
              minValue: 0,
              provider: 'kyber',
              rate: 924.2073635371164,
              refundAddress: '0x7676e10eefc7311970a12387518442136ea14d81',
              timestamp: '2020-07-21T19:15:30.980Z',
              toAddress: '0x7676e10eefc7311970a12387518442136ea14d81',
              toCurrency: 'BAT',
              toValue: '924.207364',
            },
            id: 83
          }
        }},
        logger
    )
      .then(response => {
        const result = response.response.result;
        orderId = result.id;
        console.log(result); // todo remove dev item
        expect(result.metadata).toEqual(expect.anything());
        expect(result.metadata.marketImpact).toEqual(null);
        // expect(result.output.currency).toBe('BTC');
        // expect(response.response.id).toBe(83);
        done();
      })
      .catch(console.log);
  });
  test('Get excluded dexes for DEX AG', async done => {
    expect.assertions(1);

    dexag(
      {
        body: {
          jsonrpc: '2.0',
          method: 'excludedDexes',
          params: {},
          id: 83
        }
      },
      logger
    )
      .then(response => {
        const result = response.response.result;
        orderId = result.id;
        console.log(result); // todo remove dev item
        expect(Array.isArray(result)).toBe(true);
        // expect(result.status).toBe('OPEN');
        // expect(result.input.currency).toBe('ETH');
        // expect(result.output.currency).toBe('BTC');
        // expect(response.response.id).toBe(83);
        done();
      })
      .catch(console.log);
  }, 60000);

  test('Get Supported Currencies for DEX AG', async done => {
    expect.assertions(1);

    dexag(
      {
        body: {
          jsonrpc: '2.0',
          method: 'getSupportedCurrencies',
          params: {},
          id: 83
        }
      },
      logger
    )
      .then(response => {
        const result = response.response.result;
        orderId = result.id;
        console.log(result); // todo remove dev item
        expect(Array.isArray(result)).toBe(true);
        // expect(result.status).toBe('OPEN');
        // expect(result.input.currency).toBe('ETH');
        // expect(result.output.currency).toBe('BTC');
        // expect(response.response.id).toBe(83);
        done();
      })
      .catch(console.log);
  }, 2000);

  xtest('Check order status', async done => {
    expect.assertions(4);
    dexag(
      {
        body: {jsonrpc: '2.0', method: 'getStatus', params: [orderId], id: 85}
      },
      logger
    )
      .then(response => {
        const result = response.response.result;
        expect(result.status).toBe('OPEN');
        expect(result.input.currency).toBe('ETH');
        expect(result.output.currency).toBe('BTC');
        expect(response.response.id).toBe(85);
        done();
      })
      .catch(console.log);
  });
});
