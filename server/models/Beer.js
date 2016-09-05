const mongoose = require('mongoose');


const beerSchema = new mongoose.Schema({
  name:{type:String, required:true},
  rating: {type: Number, min: 1, max: 10},
  comments: {type: String},
  sample: {type: Boolean, default: false}
});

const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;