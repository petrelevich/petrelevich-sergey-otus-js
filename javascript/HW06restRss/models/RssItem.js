const mongoose = require('mongoose');

const model = mongoose.model("RssItems", {
    channelId: String,
    guid: String,
    title: String,
    link: String,
    description: String,
    pubDate: String,
    category: String
});

module.exports = {
    model: model
};