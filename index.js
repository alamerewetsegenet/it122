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

//API

//get all
app.get('/api/cars', (req,res) => {
    Car.find({}).lean()
      .then((cars) => {
        res.json(cars);})
      .catch(err =>  {
        res.status(500).send('Database Error occurred');
      })
});

//get one 
app.get('/api/car/:make', (req,res) => {
    Car.findOne({ make:req.params.make }).lean()
        .then((cars) => {
           res.json(cars);
        })
        .catch(err => {
            res.status(500).send('Database Error occurred');I
        });
});

// delete one 
app.get('/api/delete/:make', (req,res, next) => {
    Car.deleteOne({"make":req.params.make }, (err, result) => {
        if (err) return next(err);
        res.json({"deleted": result});
    });
});
// add
app.post('/api/add/', (req,res, next) => {
    if (!req.body.make) { 
        let car = new Car(req.body);
        car.save((err,newCar) => {
            if (err) return next(err);
            res.json({updated: 0, make: newCar.make});
        });
    } else { 
        Car.updateOne({ make: req.body.make}, {model:req.body.model, year: req.body.year, color: req.body.color, price: req.body.price, pubdate: req.body.pubdate }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, make: req.body.make});
        });
    }
});




app.listen(3000, () => console.log('Listening on port 3000'));