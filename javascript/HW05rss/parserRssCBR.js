const parserRss = require('./parserRss');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true });

 parserRss.parse("https://www.cbr.ru/rss/RssNews", "cbr", mongoose);
