const express = require( "express");
const routes = require("./routes/routes.js");
const path = require( "path");
const bodyParser = require("body-parser");
const { resetWatchers } = require("nodemon/lib/monitor/watch");

const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
const expressSession = require('express-session');

app.use(expressSession({
    secret: 'help',
    saveUninitialized: true,
    resave: true
}));

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

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