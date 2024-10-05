const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

const connectToDB = async() => {
    try{
        mongoose.Promise = global.Promise;
        await mongoose.connect("mongodb+srv://b1901898:L2ncOH1ICReglCy1@cluster0.8wrqjce.mongodb.net/assignmentTwo");
        console.log("connected to database");
    }catch(error){
        console.log(error);
       //exit the program
    }
}
connectToDB();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use(cors());

const routes = require("../routes/routes");
app.use("/api", routes);

app.use(function (err, req, res, next){
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})

module.exports = app;