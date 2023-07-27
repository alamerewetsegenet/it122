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
      Countries.findOne({'make': req.params.make}, (err, result) => {
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
//get all cars 
// app.get('/api/cars', (req,res) => {
//     Car.find({}).lean()
//       .then((cars) => {
//         res.json(cars);})
//       .catch(err =>  {
//         res.status(500).send('Database Error occurred');
//       })
// });

// //get one car
// app.get('/api/cars/:make', (req,res) => {
//     Car.find({ make:req.params.make }).lean()
//         .then((cars) => {
//            res.json(cars);
//         })
//         .catch(err => {
//             res.status(500).send('Sorry this car does not exist');
//         });
// });

// //delete one car
// app.get('/api/delete/:make', (req,res, next) => {
//     Car.deleteOne({"item":req.params.make}, (err, result) => {
//         if (err) return next(err);
//         // return # of items deleted
//         res.json("successed, you have deleted:", result);
//     });
// });

// app.get('/api/delete/:name', (req, res, next) => { 
//     Countries.findOne({'name': req.params.name}, (err, result) => {
//       if (err) return next(err);
//       if (result){
//      Countries.deleteOne({'name': req.params.name}, (err, item) => {
//       if (err) return next(err);
//       res.json(["successed, You have just deleted:  ", result]);  
//      });}
//     else{
//       return res.status(500).send('Sorry this country does not exist');
//     }
//   });  
//  });
app.post('/api/add/', (req,res, next) => {
    // find & update existing item, or add new 
    if (!req.body._id) { // insert new document
        let car = new Car(req.body);
        car.save((err,newCar) => {
            if (err) return next(err);
            res.json({updated: 0, _id: newCar._id});
        });
    } else { // update existing document
        Car.updateOne({ _id: req.body._id}, {make:req.body.make, model: req.body.model, pubdate: req.body.pubdate }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

// fetch("/api/v1/cars")
//     .then((response) => response.json())
//     .then(results => console.log(results));


app.listen(3000, () => console.log('Listening on port 3000'));