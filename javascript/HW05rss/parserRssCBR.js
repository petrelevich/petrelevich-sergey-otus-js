const parserRss = require('./parserRss');
const RssItem = require('./models/RssItem');

parserRss.parse("https://www.cbr.ru/rss/RssNews", RssItem.model, "cbr");
