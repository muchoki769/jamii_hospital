const express = require('express')
const app = express()
const path = require("path");


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'));
app.get('/', (req,res) => {
    res.render('index', {title: 'my app',message: 'Hello'});
})
module.exports = app;