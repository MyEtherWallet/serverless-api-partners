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
        console.log(response); // todo remove dev item

        done();
      })
      .catch(console.log);
  });
  test('NFT image request cryptoKitties', async done => {
    expect.assertions(1);
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
        console.log(response); // todo remove dev item

        done();
      })
      .catch(console.log);
  });
  test('NFT image request MyCryptoHeroes', async done => {
    expect.assertions(1);
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
        console.log(response); // todo remove dev item

        done();
      })
      .catch(console.log);
  });
});
