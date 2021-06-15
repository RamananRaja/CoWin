//Connection to mongoDB

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CoWin1', {useNewUrlParser: true}).then(() => {
    console.log("CONNECTED TO MongoDB SUCCESSFULLY");
}).catch((e) => {
    console.log("Error while attempting to connect to Mongodb");
    console.log(e);
})

module.exports = { mongoose };