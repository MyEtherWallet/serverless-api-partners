import bity from "../src/bity";
import { consoleLogger } from "../src/loggers";
const logger = new consoleLogger("BITY");
describe("Bity API", () => {
  let orderId = null;
  test("Create new order from bity", async done => {
    expect.assertions(5);
    bity(
      {
        body: {
          jsonrpc: "2.0",
          method: "createTransaction",
          params: {
            amount: 0.5,
            pair: "ETHBTC",
            mode: 1,
            destAddress: "1DECAF2uSpFTP4L1fAHR8GCLrPqdwdLse9"
          },
          id: 83
        }
      },
      logger
    )
      .then(response => {
        const result = response.response.result;
        orderId = result.id;
        expect(result.amount).toBe(0.5);
        expect(result.status).toBe("OPEN");
        expect(result.input.currency).toBe("ETH");
        expect(result.output.currency).toBe("BTC");
        expect(response.response.id).toBe(83);
        done();
      })
      .catch(console.log);
  });
  test("Check order status", async done => {
    expect.assertions(4);
    bity(
      {
        body: { jsonrpc: "2.0", method: "getStatus", params: [orderId], id: 85 }
      },
      logger
    )
      .then(response => {
        const result = response.response.result;
        expect(result.status).toBe("OPEN");
        expect(result.input.currency).toBe("ETH");
        expect(result.output.currency).toBe("BTC");
        expect(response.response.id).toBe(85);
        done();
      })
      .catch(console.log);
  });
});
