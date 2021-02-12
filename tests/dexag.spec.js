import dexag from '../src/dexAg';
import {consoleLogger} from '../src/loggers';

const logger = new consoleLogger('DEXAG');
describe('DEX AG API', () => {
  let orderId = null;

  test("do thing", async done => {
    fetch("https://swap.mewapi.io/dexag", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json; charset=utf-8",
        "pragma": "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
      },
      "referrer": "https://www.myetherwallet.com/",
      "referrerPolicy": "origin",
      "body": "{\"jsonrpc\":\"2.0\",\"method\":\"excludedDexes\",\"params\":{},\"id\":\"af6a141e-4a30-44f3-8ae7-d0be69d63ffd\"}",
      "method": "POST",
      "mode": "cors"
    });
  })
  test('Run from DEX AG', async done => {
    expect.assertions(2);

    dexag(
      {
        body: {
          jsonrpc: '2.0',
          method: 'getPrice',
          params: {
            fromValue: 0.5,
            fromToken: 'ETH',
            toToken: 'KNC',
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
        const price = response.response.result.find(item =>{
          return item.dex === 'kyber'
        })
        dexag(
          {
            body: {
              jsonrpc: '2.0',
              method: 'createTransaction',
              params: {
                transactionParams: {
                  dex: 'kyber',
                  fromAddress: '0x43689531907482bee7e650d18411e284a7337a66',
                  fromCurrency: price.pair.base,
                  fromValue: '0.5',
                  maxValue: 0,
                  maybeToken: true,
                  minValue: 0,
                  provider: 'kyber',
                  rate: price.price,
                  refundAddress: '0x43689531907482bee7e650d18411e284a7337a66',
                  timestamp: '2020-10-19T22:43:56.176Z',
                  toAddress: '0x43689531907482BEE7e650D18411E284A7337A66',
                  toCurrency: price.pair.quote,
                  toValue: price.price
                  // additional: {source: 'dexag'},
                  // source: 'dexag',
                  // dex: 'zero_x_v2',
                  // fromAddress: '0x7676e10eefc7311970a12387518442136ea14d81',
                  // fromCurrency: 'ETH',
                  // fromValue: 1,
                  // maxValue: 0,
                  // maybeToken: true,
                  // minValue: 0,
                  // provider: 'zero_x_v2',
                  // rate: 924.2073635371164,
                  // refundAddress: '0x7676e10eefc7311970a12387518442136ea14d81',
                  // timestamp: '2020-07-21T19:15:30.980Z',
                  // toAddress: '0x7676e10eefc7311970a12387518442136ea14d81',
                  // toCurrency: 'BAT',
                  // toValue: '924.207364',
                },
                id: 83
              }
            }
          },
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
        // expect(result.status).toBe('OPEN');
        // expect(result.input.currency).toBe('ETH');
        // expect(result.output.currency).toBe('BTC');
        // expect(response.response.id).toBe(83);
      })
      .catch(console.log);
  }, 60000);
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
            toToken: 'KNC',
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
              dex: 'zero_x_v2',
              fromAddress: '0x43689531907482bee7e650d18411e284a7337a66',
              fromCurrency: 'ETH',
              fromValue: '0.001',
              maxValue: 0,
              maybeToken: true,
              minValue: 0,
              provider: 'kyber',
              rate: 366.02475,
              refundAddress: '0x43689531907482bee7e650d18411e284a7337a66',
              timestamp: '2020-10-19T22:43:56.176Z',
              toAddress: '0x43689531907482BEE7e650D18411E284A7337A66',
              toCurrency: 'DAI',
              toValue: '0.366025'
              // additional: {source: 'dexag'},
              // source: 'dexag',
              // dex: 'zero_x_v2',
              // fromAddress: '0x7676e10eefc7311970a12387518442136ea14d81',
              // fromCurrency: 'ETH',
              // fromValue: 1,
              // maxValue: 0,
              // maybeToken: true,
              // minValue: 0,
              // provider: 'zero_x_v2',
              // rate: 924.2073635371164,
              // refundAddress: '0x7676e10eefc7311970a12387518442136ea14d81',
              // timestamp: '2020-07-21T19:15:30.980Z',
              // toAddress: '0x7676e10eefc7311970a12387518442136ea14d81',
              // toCurrency: 'BAT',
              // toValue: '924.207364',
            },
            id: 83
          }
        }
      },
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
        console.log(result.length); // todo remove dev item
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
