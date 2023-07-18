import mongoose from 'mongoose';
import {connectionString} from '../credential.js';
const { Schema } = mongoose;
// For security, connectionString should be in a separate file and excluded from git

mongoose.connect(connectionString, {
    dbName: 'it-project',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const carsSchema = new Schema({
 make: { type: String, required: true },
 model: String,
 year: Date,
 color: String,
 price: Number
 
});

export const Car = mongoose.model('Car', carsSchema);