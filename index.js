import express from 'express';
const app = express();
import { getAll, getItem } from "./data.js";

//API
import cors from 'cors';
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

import { Car }  from "./models/Car.js";
//end

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


//API

app.get('/api/cars', (req,res) => {
    Car.find({}).lean()
      .then((cars) => {
        res.json(cars);})
      .catch(err =>  {
        res.status(500).send('Database Error occurred');
      })
});

app.get('/api/cars/:make', (req,res) => {
    Car.findOne({ make:req.params.make }).lean()
        .then((cars) => {
           res.json(cars);
        })
        .catch(err => {
            res.status(500).send('Database Error occurred');
        });
});


// fetch("/api/v1/cars")
//     .then((response) => response.json())
//     .then(results => console.log(results));


app.listen(3000, () => console.log('Listening on port 3000'));
