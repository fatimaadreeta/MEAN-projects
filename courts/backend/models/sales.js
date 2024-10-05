const mongoose = require('mongoose');

//this is how mocksales data was created
const salesSchema = mongoose.Schema({
   label: {type: String, required: true},
   visits: {type: Number, required: true},
});

module.exports = mongoose.model('Sales', salesSchema);