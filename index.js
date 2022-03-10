const express = require( "express");
const routes = require("./routes/routes.js");
const path = require( "path");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const { resetWatchers } = require("nodemon/lib/monitor/watch");

const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
const expressSession = require('express-session');
app.use(cookieParser());
app.use(expressSession({
    secret: 'help',
    saveUninitialized: true,
    resave: true
}));

const checkAuth = (req, res, next) => {
    if(req.session.email == req.body.email && req.session.isAuthenticated){
        next();
    }else{
        res.sendFile(__dirname +'/public/index.html', {errormessage : 'You are not logged in yet! '});
    }
}

let urlendcodedParser  = bodyParser.urlencoded({extended: false});
app.use(express.static(path.join(__dirname , 'public')));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept')
    next();
});

app.post("/loginAcc", urlendcodedParser,routes.loginUser ,(req, res) => {
    req.session.user = {
        isAuthenticated : true,
        email : req.body.email
    }
    res.sendFile(__dirname + "/public/account.html")
});

app.post("/signUpAcc", urlendcodedParser, routes.createUser, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
app.get("/accPage", urlendcodedParser, checkAuth, (req, res)=>{
    console.log(
        'The link works'
    )

    res.sendFile(__dirname + "/public/account.html");
})
// app.post("/editAcc", urlendcodedParser, routes.editUser, (req, res) => {
//     res.sendFile(__dirname + "/public/account.html");
// });
app.listen(3000);