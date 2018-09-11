const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true });

const model = mongoose.model("RssItems", {
    chanelId: String,
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