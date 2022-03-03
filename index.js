const express = require( "express");
// const expressSession from 'express-session';
const path = require( "path");
const bodyParser = require("body-parser");

const app = express();

app.set('views',__dirname+ '/views');
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
app.post("/loginAcc", urlendcodedParser, (req, res) => {
    console.log(req.body.password);
    console.log(req.body.email);
    res.sendFile(__dirname + "/views/login.html")
});
app.post("/signUpAcc", urlendcodedParser, (req, res) => {
    console.log(req.body.name);
    console.log(req.body.birthday);
    console.log(req.body.password);
    console.log(req.body.email);
    res.sendFile(__dirname + "/views/sign-up.html")
});
app.listen(3000);