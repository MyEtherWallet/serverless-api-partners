import changelly from "../src/changelly";
import { consoleLogger } from "../src/loggers";
const logger = new consoleLogger("CHANGELLY");
describe("Changelly API", () => {
  let orderId = null;
  test("GetCurrencies", async done => {
    expect.assertions(3);
    changelly(
      {
        body: {
          jsonrpc: "2.0",
          method: "getCurrencies",
          params: {},
          id: 83
        }
      },
      logger
    )
      .then(response => {
        const result = response.response.result;
        console.log(result.filter(item => item.includes('rep'))); // todo remove dev item
        expect(result).toContain("eth");
        expect(result.length).toBeGreaterThan(10);
        expect(response.response.id).toBe(83);
        done();
      })
      .catch(console.log);
  });
  test("GetRate", async done => {
    expect.assertions(1);
    changelly(
      {
        body: {
          jsonrpc: "2.0",
          method: "getExchangeAmount",
          params: [ {
            from: 'ETH',
            to: 'REP',
            amount: 1
          }],
          id: 83
        }
      },
      logger
    )
      .then(response => {
        const result = response.response.result;
        console.log(result); // todo remove dev item
        expect(result[0].from).toContain("eth");
        done();
      })
      .catch(console.log);
  });
  test("Create Transaction", async done => {
    expect.assertions(4);
    changelly(
      {
        body: {
          jsonrpc: "2.0",
          method: "createTransaction",
          params: {
            from: "eth",
            to: "btc",
            address: "1DECAF2uSpFTP4L1fAHR8GCLrPqdwdLse9",
            amount: "1"
          },
          id: 85
        }
      },
      logger
    )
      .then(response => {
        const result = response.response.result;
        orderId = result.id;
        expect(result.payoutAddress).toBe("1DECAF2uSpFTP4L1fAHR8GCLrPqdwdLse9");
        expect(result.currencyFrom).toBe("eth");
        expect(result.currencyTo).toBe("btc");
        expect(response.response.id).toBe(85);
        done();
      })
      .catch(console.log);
  });
  test("Get Status", async done => {
    expect.assertions(2);
    changelly(
      {
        body: {
          jsonrpc: "2.0",
          method: "getStatus",
          params: {
            id: orderId
          },
          id: 89
        }
      },
      logger
    )
      .then(response => {
        const result = response.response.result;
        expect(result).toBe("waiting");
        expect(response.response.id).toBe(89);
        done();
      })
      .catch(console.log);
  });
});
