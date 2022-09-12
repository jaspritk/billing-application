const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/billing-application')
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log(error));

module.exports = mongoose;