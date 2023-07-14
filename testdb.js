'use strict'

import { Car } from "./models/Car.js";


Car.find({}).lean()
  .then((books) => {
    console.log(cars);
  })
  .catch(err => next(err));
