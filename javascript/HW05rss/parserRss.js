const Parser = require('node-xml-stream');
const FetchStream = require("fetch").FetchStream;

const parse = (url, rssItem, rssChanelId) => {
    const parser = new Parser();
    const chanelId = rssChanelId;
    let item = null;
    let tagName = null;

    parser.on('opentag', (name, attrs) => {
        tagName = name;
        if (name === "item") {
            item = {};
            item["chanelId"] = chanelId;
        }
    });

    parser.on('closetag', name => {
        if (name === "item") {
            if (item !== null) {
                const itemForSave = item;
                const query = {'guid': itemForSave.guid, 'chanelId' : itemForSave.chanelId};
                rssItem.findOneAndUpdate(query, itemForSave, {upsert:true}, (err, data) => {
                    if (err) {
                        console.log("save Error:" + err);
                    } else {
                        console.log("saved item:" + JSON.stringify(data));
                    }
                });
                item = null;
            }
        }
    });

    parser.on('text', text => {
        if (item !== null) {
            item[tagName] = text;
        }

    });

    parser.on('error', err => {
        console.log("error:" + err);
    });

    const fetch = new FetchStream(url);
    fetch.pipe(parser);
};

module.exports = {
    parse: parse
};