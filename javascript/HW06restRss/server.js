const express = require('express');
const bodyParser = require('body-parser');

const RssItem = require('./models/RssItem');
const RssChanel = require('./models/RssChanel');
const parserRss = require('./parserRss');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true });


//- Создание рассылки по `URL`
app.post('/chanel', function(req, res) {

    console.log("id:" + req.body.chanelId + ", url:" + req.body.url);
    saveChanel(req.body.chanelId, req.body.url);
    parserRss.parse(req.body.url, RssItem.model, req.body.chanelId);
    res.status(201).send("created: " + req.body.url);
});

const saveChanel = (chanelId, url) => {
    const query = {'chanelId': chanelId};
    const itemForSave = {'chanelId': chanelId, 'url': url};

    RssChanel.model.findOneAndUpdate(query, itemForSave, {upsert:true}, (err, data) => {
        if (err) {
            console.log("save Error:" + err);
        } else {
            console.log("saved item:" + JSON.stringify(data));
        }
    });
};


//- Показ списка всех добавленных `URL` рассылок.
app.get('/chanel', function(req, res) {
    RssChanel.model.find({})
        .then(chanels => {res.status(201).send(chanels)})
        .catch(err => {console.error(err)});
});

//- Показ всех сохраненных из `RSS` документов.


app.listen(3000);




/*
- Создание рассылки по `URL`. При успешном добавлении приложение будет запрашивать `RSS` рассылку, парсить `XML` и сохранять документы в базу данных.
- Показ списка всех добавленных `URL` рассылок.
- Показ всех сохраненных из `RSS` документов.
*/