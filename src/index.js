const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', require('./controller/auth.controller'))
app.use('/barber-shop', require('./controller/barber-shop.controller'))


app.listen(3000, () => {
    console.log('ta funcionando?');
})