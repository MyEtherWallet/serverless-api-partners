# Serverless APIs for MEW Partners

Serverless api to communicate with Bity/Changelly/Kyber/Totle api

# Live endpoint

> `https://swap.mewapi.io`

### Table of Contents
**[Bity API](#Bity-API)**<br>
- **[createTransaction](#createTransaction)**<br>
- **[getStatus](#getStatus)**<br>
- **[getCryptoRates](#getCryptoRates)**<br>
- **[getEstimate](#getEstimate)**<br>
- **[logInWithPhoneNumber](#logInWithPhoneNumber)**<br>
- **[sendReceivedSmsCode](#sendReceivedSmsCode)**<br>
- **[createExitToFiatTransaction](#createExitToFiatTransaction)**<br>
- **[getExitOrderDetails](#getExitOrderDetails)**<br>
- **[getStatusFiat](#getStatusFiat)**<br>
- **[getFiatRates](#getFiatRates)**<br>

**[Changelly API](#Changelly-API)**<br>
**[Kyber Network API](#Kyber-API)**<br>
- **[getSupportedTokens](#getSupportedTokens)**<br>
- **[getCryptoRates](#getCryptoRates)**<br>
- **[getGasLimits](#getGasLimits)**<br>

**[Totle Network API](#Totle-API)**<br>
- **[getSupportedTokens](#getSupportedTokens)**<br>
- **[createOrder](#createOrder)**<br>

 ---
# Bity API

> `https://swap.mewapi.io/bity`

## Bity API Methods

#### createTransaction
Request:
```
{
  "jsonrpc": "2.0",
  "method": "createTransaction",
  "params": {
    "amount": 0.5,
    "pair": "ETHBTC",
    "mode": 1,
    "destAddress": "1DECAF2uSpFTP4L1fAHR8GCLrPqdwdLse9"
  },
  "id": 83
 }
```
Response:
```
{
  "jsonrpc": "2.0",
  "result": {
    "id": "69a2f7b4ede8499faf619dde0a5974e6",
    "amount": "0.5",
    "payment_address": "0xf35074bbd0a9aee46f4ea137971feec024ab7048",
    "payment_amount": "0.0001",
    "reference": "BITYXXXXXX",
    "status": "OPEN",
    "validFor": 600,
    "timestamp_created": "2016-06-12T21:50:12.367764",
    "input": {
      "amount": "0.5",
      "currency": "ETH",
      "reference": "BITYXXXXXX",
      "status": "OPEN"
    },
    "output": {
      "amount": "0.0001",
      "currency": "BTC",
      "reference": "BITYXXXXXX",
      "status": "OPEN"
    }
  },
  "id": 83
}
```
 
---
#### getStatus
Request:
```
{
  "jsonrpc": "2.0",
  "method": "getStatus",
  "params": [orderId],
  "id": 83
 }
```

Response:
```
{
  "jsonrpc": "2.0",
  "result": {
    "status": "OPEN",
    "timestamp_created": "2019-01-24T13:14:07.368Z",
    "input": {
      "amount": "0.5",
      "currency": "ETH",
      "reference": "BITYXXXXXX",
      "status": "OPEN"
    },
    "output": {
      "amount": "0.001",
      "currency": "BTC",
      "reference": "BITYXXXXXX",
      "status": "OPEN"
    }
  }
  "id": 83
 }
 ```
 
---
#### getCryptoRates
Request:
```
{
  "jsonrpc": "2.0",
  "method": "getCryptoRates",
  "params": {},
  "id": 83
 }
```

Response:
```
{
  "jsonrpc": "2.0",
  "result": {
    "meta":{
      "disabled": "CHFUSD"
      "limit": 1000
      "next": null
      "offset": 0
      "previous": null
      "total_count": 36
    },
    "objects":[
      {
        "is_enabled": true
        "pair": "BTCCHF"
        "rate": "5470.08780000"
        "rate_we_buy": "5394.57300000"
        "rate_we_buy_timestamp": "2019-04-23T00:45:00.404759"
        "rate_we_sell": "5545.47680000"
        "rate_we_sell_timestamp": "2019-04-23T00:45:00.404759"
        "resource_uri": "/api/v1/rate2/BTCCHF/"
        "source": "BTC"
        "target": "CHF"
        "timestamp": "2019-04-23T00:45:00.404759"
      },
      ...
    ]
  },
  "id": 83
}
```

---
#### getEstimate

Request:
```
{
  "jsonrpc": "2.0",
  "method": "getEstimate",
  "params": {
    "pair": "ETHBTC",
    "fromCurrency":"ETH",
    "fromValue":"1",
    "toCurrency":"BTC"
  },
  "id": 83
 }
```
Response:
```
{
  "jsonrpc": "2.0",
  "result":{
    "input": {
      "currency": "BTC",
      "amount": "1.00000000"
    },
    "output": {
      "currency": "EUR",
      "amount": "3087.86"
    }
  },
  "id": 83
}
```
#### createOrder

Request:
```
{
  "jsonrpc": "2.0",
  "method": "createOrder",
  "params": {
    "orderDetails":{
      "email": "email@example.com",
      "input":{
        "amount": 1,
        "currency": "ETH",
        "crypto_address": ""
      },
      "currency": "CHF",
      "iban": "CH3600000000000000000",
      "bic_swift":"TESTCHBEXXX",
      "name":"FirstName LastName",
      "address":"Test address",
      "address_complement":"", (optional)
      "zip":"12345",
      "city":"anytown",
      "state":"",
      "country":"CH" (2 char ISO country code)
    }
  },
  "id": 83
 }
```

Response:
```
{
  "jsonrpc": "2.0",
  "result": {
  "id:"asdffsadfgbg45y45y6uhytu675eye5ewybretyv4w5y6yubv6yw35ywhw",
  "reference":"asdffsadfgbg45y45y6uhytu675eye5ewybretyv4w5y6yubv6yw35ywhw",
    "input": {
      "amount": "0.5",
      "currency": "ETH"
    },
    "output": {
      "amount": "112.00",
      "currency": "CHF"
    },
    "amount": "104.95",
    "created": true
    "payment_address": "0xf35074bbd0a9aee46f4ea137971feec024ab7048",
    "payment_amount": "0.5",
    "requiresSigning": false,
    "validFor": 600,
    "timestamp_created": "2019-01-24T13:14:07.368Z",
  }
  "id": 83
 }
 ```
 
---
#### getOrderDetails
Request:
```
{
  "jsonrpc": "2.0",
  "method": "getOrderDetails",
  "params": {
    "detailsUrl":"asdffsadfgbg45y45y6uhytu675eye5ewybretyv4w5y6yubv6yw35ywhw"
  },
  "id": 83
 }
```

Response:
```
{
  "jsonrpc": "2.0",
  "result": {
    "id": "asdffsadfgbg45y45y6uhytu675eye5ewybretyv4w5y6yubv6yw35ywhw",
    "amount": "104.95",
    "status": "OPEN",
    "payment_address": "0xf35074bbd0a9aee46f4ea137971feec024ab7048",
    "payment_amount": "0.5",
    "validFor": 600,
    "timestamp_created": "2019-01-24T13:14:07.368Z",
    "input": {
      "amount": "0.5",
      "currency": "ETH"
    },
    "output": {
      "amount": "112.00",
      "currency": "CHF"
    }
  }
  "id": 83
 }
 ``` 
---
[Bity Api](https://doc.bity.com/backend/v2.html#estimate-the-amount-of-an-order)
 
---
#### logInWithPhoneNumber

Request:
```
{
  "jsonrpc": "2.0",
  "method": "logInWithPhoneNumber",
  "params": {
      "pair": "ETHBTC",
      "phone_number": "+41000997321"
    },
  "id": 83
 }
```
Response:
```
{
  "jsonrpc": "2.0",
  "result":{
    "phone_token": "34234fivpd3m21jllj9sf912fsdf"
  },
  "id": 83
}
```
[Bity Api](https://doc.bity.com/backend/v2.html#bity-api-phone-number-login)
 
---
#### sendReceivedSmsCode

Request:
```
{
  "jsonrpc": "2.0",
  "method": "sendReceivedSmsCode",
  "params": {
    "pair": "ETHBTC",
    "phoneToken": "34234fivpd3m21jllj9sf912fsdf",
    "tan": "123456"
    },
  "id": 83
 }
```

Response:
```
{
  "jsonrpc": "2.0",
  "result": {
    success: true/false
  },
  "id": 83
}
```
[Bity Api](https://doc.bity.com/backend/v2.html#bity-api-phone-number-login)
 
---
#### createExitToFiatTransaction

Request:
```
{
  "jsonrpc": "2.0",
  "method": "createExitToFiatTransaction",
  "params": {
    "pair": "ETHBTC",
    "phoneToken": "34234fivpd3m21jllj9sf912fsdf",
    "orderDetails": {
      "input": {
        "amount": "0.5",
        "currency": "ETH",
        "type": "crypto_address",
        "crypto_address": "0xf35074bbd0a9aee46f4ea137971feec024ab7048"
      },
      "output": {
        "currency": "CHF",
        "type": "bank_account",
        "iban": "CH3600000000000000000",
        "bic_swift": "CHAAAABBXXX",
        "owner": {
          "name": "John Doe",
          "address": "Brückenstrasse 12",
          "zip": "3000",
          "city": "Bern",
          "country": "CH"
        }
      }
    },
  "id": 83
 }
```

Response:
```
{
  "jsonrpc": "2.0",
  "result": {
    status_address: "statusId encrypted",
    created: true/false
  },
  "id": 83
}
```
[Bity Api](https://doc.bity.com/backend/v2.html#place-an-order)
 
---
#### getExitOrderDetails

Request:
```
{
  "jsonrpc": "2.0",
  "method": "getExitOrderDetails",
  "params": {
          "pair": "ETHBTC",
          "phoneToken": "34234fivpd3m21jllj9sf912fsdf",
          "detailsUrl":"orderId"
    },
  "id": 83
 }
```


Response"
```
{
  "jsonrpc": "2.0",
  "result": {
    "id": "0123456789abcdefghijk",
    "amount": "104.95",
    "payment_address": "0xf35074bbd0a9aee46f4ea137971feec024ab7048",
    "payment_amount": "0.5",
    "status": "CANC",
    "validFor": 600,
    "timestamp_created": "2019-01-24T13:14:07.368Z",
    "input": {
      "currency": "ETH",
      "amount": "0.5"
    },
    "output": {
      "currency": "CHF",
      "amount": "104.95"
    }
  },
  "id": 83
}
```
[Bity Api](https://doc.bity.com/backend/v2.html#get-the-details-of-an-order)
 
---
#### getStatusFiat

Request:
```
{
  "jsonrpc": "2.0",
  "method": "getStatusFiat",
  "params": {
          orderId: "sfsadfsadfsdf",
          phoneToken: "34234fivpd3m21jllj9sf912fsdf"
  },
  "id": 83
 }
```

Response:
```
{
 "jsonrpc": "2.0",
 "result":
    {
      status: response.legacy_status,
      timestamp_created: "2019-01-24T13:14:07.368Z",
      payerAddress: "0x24305d091f79ee490a34de080b0db5773be5bef4",
      paymentAddress: "0xf35074bbd0a9aee46f4ea137971feec024ab7048",
      payment_amount: "0.5",
      input: {
        "currency": "ETH",
        "amount": "0.5"
      },
      output: {
        "currency": "CHF",
        "amount": "104.95",
      }
    },
  "id": 83
}
```
[Bity Api](https://doc.bity.com/backend/v2.html#get-the-details-of-an-order)
 
 ---
#### getFiatRates
Request:
```
{
  "jsonrpc": "2.0",
  "method": "getFiatRates",
  "params": {},
  "id": 83
 }
```

 
 ---

# Changelly API

> `https://swap.mewapi.io/changelly`

changelly api is identical to https://api-docs.changelly.com
Except `api-key` and `sign` headers are not required

### createTransaction

```
{
  "jsonrpc": "2.0",
  "method": "createTransaction",
  "params": {
			  "from": "eth",
			  "to": "btc",
			  "address": "1DECAF2uSpFTP4L1fAHR8GCLrPqdwdLse9",
			  "amount": "1"
			},
  "id": 85
}
```

# Kyber API

> `https://swap.mewapi.io/kyber`

#### getSupportedTokens

```
{
  "jsonrpc": "2.0",
  "method": "getSupportedTokens",
  "params": [],
  "id": 85
}
```


#### getCryptoRates

```
{
  "jsonrpc": "2.0",
  "method": "getCryptoRates",
  "params": [],
  "id": 85
}
```

#### getGasLimits
```
{
  "jsonrpc": "2.0",
  "method": "getGasLimits",
  "params": [],
  "id": 85
}
```

# Totle API

> `https://swap.mewapi.io/totle`

#### getSupportedTokens

Request:
```
{
  "jsonrpc": "2.0",
  "method": "getSupportedTokens",
  "params": [],
  "id": 85
}
```

Response:
```
{
  "jsonrpc": "2.0",
  "result": {
    "tokens": [{
      "name": "DATAcoin",
      "symbol": "DATA",
      "address": "0x0cf0ee63788a0849fe5297f3407f701e122cc023",
      "decimals": 18,
      "tradable": true
    }]
  },
  "id": 85
}
```

#### createOrder

Request:

```
{
  "jsonrpc": "2.0",
  "method": "createOrder",
  "params": {
    "apiKey": "",
    "partnerContract": "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
    "address": "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
    "config": {
        "transactions": true,
        "fillNonce": false,
        "skipBalanceChecks": false
    },
    "swap": {
        "sourceAsset": "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
        "destinationAsset": "0x0000000000000000000000000000000000000000",
        "destinationAmount": 100000000000000000,
        "isOptional": false
    }
  },
  "id": 85
}
```

Response:
```
{
  "jsonrpc": "2.0",
  "result": {
    "success": true,
    "response": {
        "id": "0x4e7ed7b2df7f429f9aeaa9a00cff25555e518f797a694e7fa59f9880c80a7887",
        "summary": [
            {
                "sourceAsset": {
                    "address": "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
                    "symbol": "MANA",
                    "decimals": "18"
                },
                "sourceAmount": "100000000000000000",
                "destinationAsset": {
                    "address": "0x0000000000000000000000000000000000000000",
                    "symbol": "ETH",
                    "decimals": "18"
                },
                "destinationAmount": "19387450738027",
                "notes": [],
                "rate": "0.00019387450738027",
                "market": {
                    "rate": "0.00019387450738027",
                    "slippage": "0%"
                },
                "runnerUpRoutes": [],
                "trades": [
                    {
                        "sourceAsset": {
                            "address": "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
                            "symbol": "MANA",
                            "decimals": "18"
                        },
                        "sourceAmount": "100000000000000000",
                        "destinationAsset": {
                            "address": "0x0000000000000000000000000000000000000000",
                            "symbol": "ETH",
                            "decimals": "18"
                        },
                        "destinationAmount": "19387450738027",
                        "orders": [
                            {
                                "sourceAsset": {
                                    "address": "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
                                    "symbol": "MANA",
                                    "decimals": "18"
                                },
                                "sourceAmount": "100000000000000000",
                                "destinationAsset": {
                                    "address": "0x0000000000000000000000000000000000000000",
                                    "symbol": "ETH",
                                    "decimals": "18"
                                },
                                "destinationAmount": "19485367155895",
                                "exchange": {
                                    "id": 2,
                                    "name": "Kyber"
                                },
                                "fee": {
                                    "percentage": "0",
                                    "amount": "0",
                                    "asset": {
                                        "address": "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
                                        "symbol": "MANA",
                                        "decimals": "18"
                                    }
                                }
                            }
                        ],
                        "runnerUpOrders": [
                            {
                                "sourceAsset": {
                                    "address": "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
                                    "symbol": "MANA",
                                    "decimals": "18"
                                },
                                "sourceAmount": "100000000000000000",
                                "destinationAsset": {
                                    "address": "0x0000000000000000000000000000000000000000",
                                    "symbol": "ETH",
                                    "decimals": "18"
                                },
                                "destinationAmount": "19381017264445",
                                "exchange": {
                                    "id": 4,
                                    "name": "Bancor"
                                },
                                "fee": {
                                    "percentage": "0",
                                    "amount": "0",
                                    "asset": {
                                        "address": "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
                                        "symbol": "MANA",
                                        "decimals": "18"
                                    }
                                }
                            }
                        ]
                    }
                ],
                "totleFee": {
                    "asset": {
                        "address": "0x0000000000000000000000000000000000000000",
                        "symbol": "ETH",
                        "decimals": "18"
                    },
                    "percentage": "0.5",
                    "amount": "97916417868"
                },
                "partnerFee": {
                    "asset": {
                        "address": "0x0000000000000000000000000000000000000000",
                        "symbol": "ETH",
                        "decimals": "18"
                    },
                    "percentage": "0",
                    "amount": "0"
                }
            }
        ],
        "transactions": [
            {
                "type": "swap",
                "tx": {
                    "to": "0xcd2053679De3BCf2b7E2C2EfB6B499C57701222c",
                    "from": "0xd18cec4907b50f4eda4a197a50b619741e921b4d",
                    "value": "0",
                    "data": "0xa32305a2000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000076edf2d56f60f3717c59e90b1c3cc95cd574272900000000000000000000000000000000000000000000000000000000007d86474e7ed7b2df7f429f9aeaa9a00cff25555e518f797a694e7fa59f9880c80a7887000000000000000000000000000000000000000000000000000000000000001c96c16c4c21e7bdb8773e75fa46422c44a9829ad7fbba2672c87401556d441e9f5726e940e03eee6646bcf8159db1dffea40b2ca25a7fee2720e2fdb092a9cee600000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000009eb1ef0770c30000000000000000000000000000000000000000000000000000111a92a6a20f000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d18cec4907b50f4eda4a197a50b619741e921b4d0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000f5d2fb29fb7d3cfee444a200298f468908cc9420000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000077b26c9f9b87668b66db65dce7cc2b392ff59966000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000f5d2fb29fb7d3cfee444a200298f468908cc9420000000000000000000000000000000000000000000000000000000000000000000000000000000000000000716156326b3dd55ed5e795ac5f19afdaab866daf000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000967f1c667fc490ddd2fb941e3a461223c03d40e90000000000000000000000000f5d2fb29fb7d3cfee444a200298f468908cc94200000000000000000000000079d83b390cf0edf86b9efbe47b556cc6e20926ac0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c0000000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c000000000000000000000000c0829421c1d260bd3cb3e0f06cfe2d52db2ce3150000000000000000000000000000000000000000000000000000000000000000",
                    "gasPrice": "8734375000",
                    "gas": "900000"
                }
            }
        ],
        "rateLimit": {
            "callsMade": 10,
            "callsLeft": 10
        },
        "signature": "",
        "expiration": {
            "blockNumber": 8226375,
            "estimatedTimestamp": ""
        }
    }
  },
  "id": 85
}
```
