const express = require('express');
const routes = require('./routes/routes');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

let urlencodedParser = express.urlencoded({
    extended: false
});

//app.get('/', routes.index);
//app.get('/create', routes.create);

app.listen(3000);