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