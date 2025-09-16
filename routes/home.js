const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.render('index', {title: 'my app',message: 'Hello'});
})
module.exports = app;