# Serverless APIs for MEW Partners

Serverless api to communicate with Changelly/Bity api

# Live endpoint

> `https://swap.mewapi.io`

# Bity API

> `https://swap.mewapi.io/bity`

### createTransaction

```
{
  "jsonrpc": "2.0",
  "method": "createTransaction",
  "params": {	"amount": 0.5,
				"pair": "ETHBTC",
				"mode": 1,
				"destAddress": "1DECAF2uSpFTP4L1fAHR8GCLrPqdwdLse9"
			},
  "id": 83
 }
```

### getStatus

```
{
  "jsonrpc": "2.0",
  "method": "getStatus",
  "params": [orderId],
  "id": 83
 }
```

### getCryptoRates

```
{
  "jsonrpc": "2.0",
  "method": "getCryptoRates",
  "params": {},
  "id": 83
 }
```

### createPhoneTransaction

```
{
  "jsonrpc": "2.0",
  "method": "createExitToFiatTransaction",
  "params": {
  "pair": "ETHBTC",
  "phoneToken": "sfsafsdfsdf",
  "orderDetails": {}
  },
  "id": 83
 }
```

### getEstimate

```
{
  "jsonrpc": "2.0",
  "method": "getEstimate",
  "params": {TODO},
  "id": 83
 }
```

### logInWithPhoneNumber

```
{
  "jsonrpc": "2.0",
  "method": "logInWithPhoneNumber",
  "params": {TODO},
  "id": 83
 }
```

### sendReceivedSmsCode

```
{
  "jsonrpc": "2.0",
  "method": "sendReceivedSmsCode",
  "params": {TODO},
  "id": 83
 }
```

### createExitToFiatTransaction

```
{
  "jsonrpc": "2.0",
  "method": "createExitToFiatTransaction",
  "params": {TODO},
  "id": 83
 }
```

### getExitOrderDetails

```
{
  "jsonrpc": "2.0",
  "method": "getExitOrderDetails",
  "params": {TODO},
  "id": 83
 }
```

### getStatusFiat

```
{
  "jsonrpc": "2.0",
  "method": "getStatusFiat",
  "params": {TODO},
  "id": 83
 }
```

### getFiatRates

```
{
  "jsonrpc": "2.0",
  "method": "getFiatRates",
  "params": {TODO},
  "id": 83
 }
```



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

### getSupportedTokens

```
{
  "jsonrpc": "2.0",
  "method": "getSupportedTokens",
  "params": [],
  "id": 85
}
```


### getCryptoRates

```
{
  "jsonrpc": "2.0",
  "method": "getCryptoRates",
  "params": [],
  "id": 85
}
```
