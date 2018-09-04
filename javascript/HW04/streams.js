const {pipeline} = require('stream');
const stream = require('stream');

function dataProcessor(func) {
    return new Promise(() => setTimeout(func, 3000));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const randGen = (function() {
    let val = 0;
    const streamRb = new stream.Readable({
        objectMode: true,
        highWaterMark: 5,
        read() {
            console.log(">>>>generated data:" + val);
            streamRb.push(val++);
        }
    });
    return streamRb;
})();

const transformator = (function() {
    const streamTrans = new stream.Transform({
        objectMode: true,
        highWaterMark: 10,
        transform: (chunk, encoding, done) => {
            let outData = -1;
            if (chunk !== null) {
                console.log();
                outData = chunk + getRandomInt(100);
                console.log("input data: " + chunk + " transformed data:" + outData);
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

console.log("HWM reader:" + randGen.readableHighWaterMark);
console.log("HWM writer:" + writer.writableHighWaterMark);

console.log("HWM read transformator:" + transformator.readableHighWaterMark);
console.log("HWM write transformator:" + transformator.writableHighWaterMark);

randGen.pipe(transformator).pipe(writer);

/*
randGen.on('data', (data) => {
    const result = writer.write(data);
    console.log(result);
});
*/


