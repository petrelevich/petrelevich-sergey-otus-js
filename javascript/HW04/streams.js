const {pipeline} = require('stream');
const stream = require('stream');

function dataProcessor(func) {
    return new Promise(() => setTimeout(func, 5000));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const randGen = (function() {
    const streamRb = new stream.Readable({
        objectMode: true,
        read() {}
    });

    setInterval(() => {
        const value = getRandomInt(100);
        console.log("generated value:" + value);
        streamRb.push(value);
    }, 1000);

    return streamRb;
})();

const transformator = (function() {
    const streamTrans = new stream.Transform({
        objectMode: true,
        transform: (chunk, encoding, done) => {
            let outData = -1;
            if (chunk !== null) {
                console.log("input data:" + chunk);
                outData = chunk + getRandomInt(100);
                console.log("transformed data:" + outData);
            }
            done(null, outData);
        }
    });

    return streamTrans;
})();


const writer = (function() {
    const streamWrite = new stream.Writable({
        highWaterMark: 2,
        objectMode: true,
        write: (chunk, encoding, done) => {
            if (chunk !== null) {
                dataProcessor(() => {
                    console.log(">>>>>data:" + chunk);
                    done();
                });

            }
        }
    });

    return streamWrite;
})();

console.log(writer.writableHighWaterMark);

//randGen.pipe(transformator).pipe(writer);
randGen.pipe(writer);
/*
randGen.on('data', (data) => {
    const result = writer.write(data);
    console.log(result);
});
*/


