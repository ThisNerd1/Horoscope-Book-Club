const express = require( "express");
const routes = require("./routes/routes.js");
// const expressSession from 'express-session';
const path = require( "path");
const bodyParser = require("body-parser");
const { resetWatchers } = require("nodemon/lib/monitor/watch");

const app = express();
// console.log(__dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let urlendcodedParser  = bodyParser.urlencoded({extended: false});
app.use(express.static(path.join(__dirname , 'public')));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept')
    next();
});
app.post("/loginAcc", urlendcodedParser,routes.loginUser ,(req, res) => {
    res.sendFile(__dirname + "/public/account.html")
});
app.post("/signUpAcc", urlendcodedParser, routes.createUser, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
app.listen(3000);