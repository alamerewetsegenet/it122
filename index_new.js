import express from 'express';

import * as data from './data.js';

console.log("1 - Program Start")

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', { students: data.getAll() });
});i

app.get('/students/:name', (req, res) => {
    console.log(req.params.name)
    res.send(`Welcome ${req.params.name}`);
});

