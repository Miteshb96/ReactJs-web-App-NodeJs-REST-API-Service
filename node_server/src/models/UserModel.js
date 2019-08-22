const mongoose = require("mongoose");
const schema = mongoose.Schema;

const User = new schema({
    email: String,
    password: String 
}, {
    versionKey: false
});

module.exports =  mongoose.model('User', User);