const express = require('express');
const app = express();
const dataModule = require('./data');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = dataModule.getAll();
    res.render('home', {data});
});

app.get('/detail', (req, res) => {
    const model = req.query.model;
    const item = dataModule.getItem(model);
    res.render('detail', {item});
    //console.log(model)
});

app.listen(3000, () => console.log('Listening on port 3000'));
