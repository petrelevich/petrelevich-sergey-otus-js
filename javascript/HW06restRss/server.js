const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const RssItem    = require('./models/RssItem');
const RssChannel = require('./models/RssChannel');
const parserRss  = require('./parserRss');
const utilRss    = require('./utilRss');

const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true });


//- Создание рассылки по `URL`
app.post('/channel', function(req, res) {
    if (!req.body.channelId) {
        res.status(400).send("error: channelId is not specified");
    }
    utilRss.saveChannel(RssChannel.model, req.body.channelId, req.body.url);
    parserRss.parse(req.body.url, RssItem.model, req.body.channelId);
    res.status(201).send("created: " + req.body.url);
});

//- Показ списка всех добавленных `URL` рассылок.
app.get('/channel', function(req, res) {
    utilRss.getChannelList(RssChannel.model, (result) => {res.status(201).send(result);});
});

//- Показ всех сохраненных из `RSS` документов.
app.get('/rssItems/:channelId', function(req, res) {
    utilRss.getRssItems(RssItem.model, req.params.channelId, (result) => {res.status(201).send(result);});
});


app.listen(3000);