const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://gabspg:kwTCQKyQfiT2SvME@split-bill.9skogp6.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

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
  items: [{ itemName: String, price: Number, quantity: Number, people: Array }],
});

const Bill = mongoose.model('bills', billSchema);

module.exports = Bill;
