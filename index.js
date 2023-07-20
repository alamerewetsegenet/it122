import express from 'express';
const app = express();
import { getAll, getItem } from "./data.js";



app.set('view engine', 'ejs');
app.set('view options', { layout: './layouts/main.hbs'});

app.get('/', (req, res) => {
    const data = getAll();
    res.render('home', {data});
});

app.get('/detail', (req, res) => {
    const model = req.query.model;
    const item = getItem(model);
    res.render('detail', {item});
});
app.get('/delete', (req, res) => {
    const model = req.query.model;
    const item = getItem(model);
    res.render('delete', {item});
});



app.listen(3000, () => console.log('Listening on port 3000'));
