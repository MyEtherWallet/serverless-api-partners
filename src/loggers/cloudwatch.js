import AWS from "aws-sdk";
const cloudwatch = new AWS.CloudWatch();

const getLogObject = method => {
  return {
    MetricName: "RPCAnalytics",
    Dimensions: [
      {
        Name: "Type",
        Value: method
      }
    ],
    Timestamp: new Date(),
    Unit: "Count",
    Value: 1
  };
};

const addToCloudWatch = (metricData, type) => {
  const params = {
    MetricData: metricData,
    Namespace: "RPCAnalytics-" + type
  };
  cloudwatch.putMetricData(params, function(err) {
    if (err) console.log(err);
  });
};

const processChunks = (chunk, type) => {
  const metricData = [];
  for (const i in chunk) {
    if (!chunk[i].method) continue;
    else {
      metricData.push(getLogObject(chunk[i].method));
    }
  }
  if (metricData.length) addToCloudWatch(metricData, type);
};
const chunker = (arr, type) => {
  let i,
    j,
    _arr;
  const chunk = 20;
  for (i = 0, j = arr.length; i < j; i += chunk) {
    _arr = arr.slice(i, i + chunk);
    processChunks(_arr, type);
  }
};

class Logger {
  constructor(type) {
    this.type = type;
  }
  process(reqBody) {
    if (Array.isArray(reqBody)) chunker(reqBody, this.type);
    else if (reqBody.method) {
      addToCloudWatch([getLogObject(reqBody.method)], this.type);
    }
  }
  errorReporter(partnerName){
    addToCloudWatch([getLogObject(partnerName)], "PARTNER_API_ERRORS");
  }
}

export default Logger;
