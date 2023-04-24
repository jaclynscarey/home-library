const express = require('express');
const logger = require('morgan');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));;
app.use(express.static('public'));


port = 3000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});