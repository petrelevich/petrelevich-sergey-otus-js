const parserRss = require('./parserRss');
const RssItem = require('./models/RssItem');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true });

parserRss.parse("https://www.cbr.ru/rss/RssNews", RssItem.model(mongoose), "cbr");
