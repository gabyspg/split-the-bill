const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://gabspg:kwTCQKyQfiT2SvME@split-bill.9skogp6.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'split-bill',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemName: String,
  price: Number,
  quantity: Number,
});

const personSchema = new Schema({
  items: [itemSchema],
  subtotal: Number,
  tax: Number,
  tip: Number,
  total: Number,
});

const billSchema = new Schema({
  billName: String,
  restaurant: String,
  date: String,
  subtotal: Number,
  tax: Number,
  taxPercentage: Number,
  tip: Number,
  tipPercentage: Number,
  total: Number,
  people: {
    type: Map,
    of: personSchema,
  },
  foodItems: [
    { itemName: String, price: Number, quantity: Number, people: Array },
  ],
});

// creats a model for the 'bill' collection that will be part of the export
const Bill = mongoose.model('bills', billSchema);

// exports all the models in an object to be used in the controller
module.exports = Bill;
