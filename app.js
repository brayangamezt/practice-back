const express=require('express');
const cors=require('cors');
const app=express();
const route=require('./routes/routes');

app.use(express.json())  //Cualquier peticion que se haga o reciva se convertira a JSON
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use('/', route);

module.exports=app;