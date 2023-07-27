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

app.get('/api/cars', (req, res, next) => {
    Car.find({}, (err, items) => {
     if (err) return next(err);
     res.json(items);
    });
    });
  
  //get 1 car data
  app.get('/api/car/:make', (req, res, next) => {
    Car.findOne({'make': req.params.make}, (err, item) => {
      if (err) return next(err);
      if (item){
      res.json(item);
      }
      else {
        return res.status(500).send('Sorry this car does not exist');
      }
    }); 
  });
  
  // delete 1 car
  app.get('/api/delete/:make', (req, res, next) => { 
      Car.findOne({'make': req.params.make}, (err, result) => {
        if (err) return next(err);
        if (result){
       Car.deleteOne({'make': req.params.make}, (err, item) => {
        if (err) return next(err);
        res.json(["successed, You have just deleted:  ", result]);  
       });}
      else{
        return res.status(500).send('Sorry this car does not exist');
      }
    });  
   });
  
    //add post route from the apiform
 app.post('/api/add/', (req, res, next) => {
    var newItem = {'make': req.body.make, 'model':req.body.model, 'year': req.body.year, 'color': req.body.color, 'price': req.body.price };
    Car.findOneAndUpdate({'make': req.body.make}, newItem, {upsert: true, new:true, useFindAndModify: false}, (err, result) => {
        res.json(["successed, You have just Added/Updated:  ", result]);
    });
  });



app.listen(3000, () => console.log('Listening on port 3000'));
