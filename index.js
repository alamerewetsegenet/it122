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
app.get('/api/cars', (req,res) => {
    Car.find({}).lean()
      .then((cars) => {
        res.json(cars);})
      .catch(err =>  {
      })
});

//get one 
app.get('/api/cars/:make', async (req,res) => {
    try {
        const cars = await Car.findOne({ make:req.params.make }).lean();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete 
app.get('/api/delete/:make', (req,res, next) => {
    Car.deleteOne({make:req.params.make }).lean()
    .then((result) => {
        res.json(result);
    });
});

app.post('/api/add', async (req,res, next) => {
    if (!req.body._id) { 
        let car = new Car(req.body);
        try {
            const newCar = await car.save();
            res.json({updated: 0, make: newCar.make});
        } catch (err) {
            res.json({err});
        }
    } else { 
        try {
            const result = await Car.updateOne(
                { _id:req.body._id}, 
                {$set: req.body},
                {returnDocument: 'after'}
            );
            console.log('updated succesfuly');
            res.json({updated: req.body, make:req.body.make});
        } catch (err) {
            res.json({err});
        }
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