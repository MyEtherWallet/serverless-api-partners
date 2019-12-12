import proxy from '../src/proxy';
import {consoleLogger} from '../src/loggers';

const logger = new consoleLogger('PROXY');
describe('Proxy API', () => {
  test('Get slug results', async done => {
    expect.assertions(3);
    proxy(
      {
        queryString: {
          url: 'https://api.stateofthedapps.com/dapps/makerdao',
        }
      },
      logger
    )
      .then(response => {
        const result = response.response
        expect(response).toEqual(expect.anything());
        expect(result.item).toEqual(expect.anything());
        expect(result.item.sites).toEqual(expect.anything());
        done();
      })
      .catch(console.log);
  });

  test('Get mew tag results', async done => {
    expect.assertions(2);
    proxy(
      {
        queryString: {
          url: 'https://api.stateofthedapps.com/dapps?tags=mew',
        }
      },
      logger
    )
      .then(response => {
        expect(response).toEqual(expect.anything());
        const result = response.response
        expect(result.items).toEqual(expect.anything());
        done();
      })
      .catch(console.log);
  });

  test('Reject on invalid url', async done => {
    expect.assertions(1);
    proxy(
      {
        queryString: {
          url: 'https://api.stateoftedapps.com/dapps?tags=mew',
        }
      },
      logger
    )
      .then(console.error)
      .catch(err => {
          expect(err).toEqual(expect.anything());
          done();
        });
  });
});


