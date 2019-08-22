const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const session = require("express-session");
const { Auth, Thread } = require("./src/routes");
const cors = require("cors")
const app = express();
const PORT = 3001;

app.use(cors())
app.use(session({secret:"thisisthemostsecretkeyever", resave : false, saveUninitialized : true}));
app.use(bodyParser.json()); //Parses the text as JSON and exposes the resulting object on req.body
mongoose.promise = global.promise

mongoose.connect("mongodb://localhost:27017/Dcoder");

app.use('/auth', Auth);
app.use('/thread', Thread);

app.listen(PORT,()=>{
    console.log(`server listening at ${PORT}`);
})