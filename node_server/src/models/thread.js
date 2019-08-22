const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Thread = new schema({
    title: String,
    description: String,
    tags: Array,
    userName: String,
    date: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Thread', Thread);