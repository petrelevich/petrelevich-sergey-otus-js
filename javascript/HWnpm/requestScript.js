const request = require('request');

const requestCount = process.argv[2];
const parallelRequest = process.argv[3] === 'true';

const url = 'http://127.0.0.1:3000';

console.log("requestCount:" + requestCount + ", parallelRequest:" + parallelRequest);
 if (parallelRequest === false) {
     doSynchRequest(url, requestCount);
 } else {
     for (let idx = 0; idx < requestCount; idx++) {
         console.log(`request, idx:${idx}`);
         doRequest(url);
     }
 }

function doRequest(url) {
    request(url, function (error, response, body) {
        if (error) {
            throw error;
        }
        console.log('body:', body);
        return body;
    });
}

function doSynchRequest(url, counter) {
    console.log(`request, currentCounter:${counter}`);
    if (counter === 0) {
        return;
    }
    doRequestPromis('http://127.0.0.1:3000').then((data) => {
        console.log(`resp:${data}`);
        doSynchRequest(url, counter - 1);
    });
}

function doRequestPromis(url) {
  return new Promise(function(resolve, reject) {
      request(url, function (error, response, body) {
          if (error) {
              throw error;
          }
          console.log('body:', body);
          resolve(body);
      });
  });
}