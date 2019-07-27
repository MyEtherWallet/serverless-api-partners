import nft from '../src/nft';
import { consoleLogger } from '../src/loggers';

const logger = new consoleLogger('BITY');
describe('NFT API', () => {
  let orderId = null;
  test('NFT Proxy', async done => {
    expect.assertions(1);
    nft(
      {
        queryString: {
          proxy: 'img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/379174.svg'
        }
      },
      logger
    )
      .then(response => {
        expect(response).toEqual(expect.anything());

        done();
      })
      .catch(console.log);
  });
  test('NFT image request cryptoKitties', async done => {
    expect.assertions(2);
    nft(
      {
        queryString: {
          contract: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
          token: '379174'
        }
      },
      logger
    )
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.headers['content-type']).toEqual('image/svg+xml')
        done();
      })
      .catch(console.log);
  });
  test('NFT image request cryptoKitties2', async done => {
    expect.assertions(2);
    nft(
      {
        queryString: {
          contract: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
          token: '919050'
        }
      },
      logger
    )
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.headers['content-type']).toEqual('image/svg+xml')
        done();
      })
      .catch(console.log);
  });
  test('NFT image request MyCryptoHeroes', async done => {
    expect.assertions(2);
    nft(
      {
        queryString: {
          contract: '0x273f7f8e6489682df756151f5525576e322d51a3',
          token: '40260015'
        }
      },
      logger
    )
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.headers['content-type']).toEqual('image/png')
        done();
      })
      .catch(console.log);
  });
  test('NFT image request godsunchained', async done => {
    expect.assertions(2);
    nft(
      {
        queryString: {
          contract: '0x6EbeAf8e8E946F0716E6533A6f2cefc83f60e8Ab',
          token: '417876'
        }
      },
      logger
    )
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.headers['content-type']).toEqual('image/png')

        done();
      })
      .catch(console.log);
  });
  test('NFT image request cryptoFlowers', async done => {
    expect.assertions(2);
    nft(
      {
        queryString: {
          contract: '0x8bc67d00253fd60b1afcce88b78820413139f4c6',
          token: '23479'
        }
      },
      logger
    )
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.headers['content-type']).toEqual('image/png')

        done();
      })
      .catch(console.log);
  });
  test('NFT image request etheremon', async done => {
    expect.assertions(2);
    nft(
      {
        queryString: {
          contract: '0x5d00d312e171be5342067c09bae883f9bcb2003b',
          token: '10007'
        }
      },
      logger
    )
      .then(response => {
        expect(response).toEqual(expect.anything());
        expect(response.headers['content-type']).toEqual('image/png')

        done();
      })
      .catch(console.log);
  });
});
