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

// sets a schema for the 'species' collection
const billSchema = new Schema({
  billName: String,
  place: String,
  date: String,
  people: [
    {
      person: String,
      foodItems: [
        {
          item: String,
          price: Number,
          quantity: Number,
        },
      ],
    },
  ],
  foodItems: [
    {
      item: String,
      quantity: Number,
      price: Number,
    },
  ],
  tax: Number,
  tip: Number,
});

// creats a model for the 'species' collection that will be part of the export
const Bill = mongoose.model('bills', billSchema);

// exports all the models in an object to be used in the controller
module.exports = {
  Bill,
};
