const express = require('express');
const app = express();
const dataModule = require('./data');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = dataModule.getAll();
    res.render('home', {data});
});

app.get('/detail', (req, res) => {
    const name = req.query.name;
    const item = dataModule.getItem(name);
    res.render('detail', {item});
});

app.listen(3000, () => console.log('Listening on port 3000'));