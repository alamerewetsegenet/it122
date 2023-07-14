'use strict'

import { Car } from "./models/Car.js"

Car.find({}).lean()
.then((cars) => {
  console.log(cars);
})
.catch(err => console.log(err));

