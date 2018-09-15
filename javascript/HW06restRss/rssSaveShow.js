/*
const Parser = require('node-xml-stream');
const FetchStream = require("fetch").FetchStream;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true });

    const parser = new Parser();
    const RssItem = mongoose.model('rssItem', {
        title: String,
        link: String,
        description: String,
        pubDate: String,
        category: String
    });

    let item = null;
    let tagName = null;

    parser.on('opentag', (name, attrs) => {
        tagName = name;
        if (name === "item") {
            item = new RssItem();
        }
    });

    parser.on('closetag', name => {
        if (name === "item") {
            if (item !== null) {
                const itemForSave = item;
                itemForSave.save().then(() => console.log("saved item:" + itemForSave)
                );
                item = null;
            }
        }
    });

    parser.on('text', text => {
        if (item!== null) {
            item[tagName] = text;
        }

    });

    parser.on('error', err => {
        console.log("error:" + err);
    });


    const fetch = new FetchStream("https://www.cbr.ru/rss/RssNews");
    fetch.pipe(parser);
 */

const stream = require('stream');

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


const transformator = new stream.Transform({
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


const writer = new stream.Writable({
    highWaterMark: 2,
    objectMode: true,
    write: (chunk, encoding, done) => {
        if (chunk !== null) {
            setTimeout(() => {
                    console.log(">>>>>data:" + chunk);
                    done();
                }, 3000);
        }
    }
});


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


