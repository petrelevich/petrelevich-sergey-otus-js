const parserRss = require('./parserRss');
const mongoose = require('mongoose');
const RssItem = require('./models/RssItem');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true });

parserRss.parse("https://www.cbr.ru/rss/RssNews", RssItem.get(mongoose, "cbr"));
