const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let logStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), {flags: 'a'})
app.use(morgan('combined', { stream: logStream }));

app.use('/auth', require('./controller/auth.controller'))
app.use('/barber-shop', require('./controller/barber-shop.controller'))


app.listen(PORT, () => {
    console.log(`Application running at http://localhost:${PORT}`);
})