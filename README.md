# Serverless APIs for MEW Partners

Serverless api to communicate with Changelly/Bity api

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