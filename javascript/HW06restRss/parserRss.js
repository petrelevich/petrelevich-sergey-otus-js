const Parser = require('node-xml-stream');
const FetchStream = require("fetch").FetchStream;

const parse = (url, rssItem, rssChannelId) => {
    const parser = new Parser();
    const channelId = rssChannelId;
    let item = null;
    let tagName = null;
    let cdataLast = null;

    parser.on('opentag', (name, attrs) => {
        tagName = name;
        if (name === "item") {
            item = {};
            item["channelId"] = channelId;
        }
    });

    parser.on('cdata', cdata => {
        cdataLast = cdata;
    });

    parser.on('closetag', name => {
        if (name === "item") {
            if (item !== null) {
                const itemForSave = item;
                const query = {'guid': itemForSave.guid, 'channelId' : itemForSave.channelId};
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
            if (cdataLast) {
                item[tagName] = cdataLast;
                cdataLast = null;
            } else {
                item[tagName] = text;
            }
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