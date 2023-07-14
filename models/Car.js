import mongoose from 'mongoose';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
const connectionString = 'mongodb+srv://bd_user:Nathan23@cluster0.bp5jiid.mongodb.net/?retryWrites=true&w=majority';

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