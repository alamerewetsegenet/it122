'use strict'
import express from 'express';
import { Car }  from "./models/Car.js";
const app = express();

import { getAll, getItem } from "./data.js";

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded({ extended:true})); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
//API
import cors from 'cors';
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

//end

app.set('view engine', 'ejs');

 app.get('/', (req,res) => {
     Car.find({}).lean()
         .then((cars) => {
             res.render('home', {items: JSON.stringify(cars)});
         });
 });

 app.get('/detail', (req,res,next) => {
    Car.findOne({ make:req.query.make }).lean()
         .then((car) => {
             res.render('details', {result: car, make:req.query.make} );
         })
         .catch(err => next(err));
 });
 app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

//API

//get all
app.get('/api/cars/:make', (req, res, next) => {
    let make = req.params.make;
    Car.findOne({make: make}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});
app.get('/api/cars', (req,res) => {
    Car.find({}).lean()
      .then((cars) => {
        res.json(cars);})
      .catch(err =>  {
      })
});

//get one 
app.get('/api/cars/:make', (req,res) => {
    Car.findOne({ make:req.params.make }).lean()
        .then((cars) => {
           res.json(cars);
        })
        .catch(err => {
        });
});

// delete 
app.get('/api/delete/:make', (req,res, next) => {
    Car.deleteOne({make:req.params.make }).lean()
    .then((result) => {
        res.json(result);
    });
});

app.post('/api/add/:make/:model/:year/:color/:price', (req,res, next) => {
    if (!req.body.make) { 
        let car = new Car(req.body);
        car.save((err,newCar) => {
            if (err) return next(err);
            res.json({updated: 0, make: newCar.make});
        });
    } else { 
        Car.updateOne({ make:req.body.make}, {model:req.body.model, year:req.body.year, color:req.body.color, price:req.body.price, pubdate:req.body.pubdate }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, make:req.body.make});
        });
    }
});

app.get('/api/add/:make/:model/:year/:color/:price', (req,res, next) => {
    let make = req.params.make;
    Car.updateOne({ make: make}, {make:make, model: req.params.model, year: req.params.year, color: req.params.color, price: req.params.price}, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});



app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});