const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const expressSession = require('express-session');
const { json } = require('body-parser');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin2:Pass112@cluster0.o4mbh.mongodb.net/test', {
    useUnifiedTopology: true, 
    useNewUrlParser: true
});

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

let userSchema = new mongoose.Schema({
    Name: String, //visible name that others see, defaults to same as username
    password: String, //hashed one is saved
    birthDate: String,
    email: String,
    sunSign: String, 
    moonSign: String,
    risingSign: String
    //[possibly other details for page customisation]
}); 
const users = mongoose.model('users', userSchema);

//create an account
exports.createUser = (req, res, next) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    const User = new users({ 
        Name: req.body.name, 
        password: hash, 
        birthDate: req.body.birthday,
        email: req.body.email,
        sunSign: req.body.sunSign, 
        moonSign: req.body.moonSign,
        risingSign: req.body.risingSign
    });
    User.save();
    next();
}
exports.getInfo = (req,res) => {
    console.log("This is in the getInfo Page: " + req.session.email)
        users.findOne({email: req.session.user.email}, (err, obj)=>{
            console.log(obj)
            res.json(obj)
        } )
}
exports.loginUser = (req, res, next) => {
    let email =  req.body.email;
    let password =  req.body.password;
    console.log(password);
    console.log(email);
    
        users.findOne({
        email: email
    }, (err, obj) => {
        if(obj == null){
            console.log("I'm sorry we couldn't find that user, please try again.")
        }else{
            console.log(obj);
            if(!bcrypt.compareSync(password, obj.password)){
                console.log("I'm sorry we couldn't find that user, please re-enter your password.")
            }else{
                next();
            }
        }
    });
}

exports.editUser = (req, res, next) => {
    let email = req.session.email;
    let password = req.session.password;
    users.findOneAndUpdate({email: email}, {
        Name: req.body.name,
        email : req.body.email,
        password : req.body.password,
        sunSign: req.body.sunSign, 
        moonSign: req.body.moonSign,
        risingSign: req.body.risingSign
    })
    next();
}


// console.log(User);

//This works it saves data to mongo compass.
//terminal line ---node public/routes/routes.js


// not connected yet
// const neo4j = require('neo4j-driver')

// const user = 'neo4j';
// const password = 'cq6HGzXHJ_dNNS3uzWhUzjjT2yunHaWtrcEvrCvElv8';

// const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
// const session = driver.session()
// const personName = 'Alice'

// try {
//     const result = session.run(
//     'CREATE (a:Person {name: $name}) RETURN a',
//     { name: personName }
//     )

//     const singleRecord = result.records[0]
//     const node = singleRecord.get(0)

//     console.log(node.properties.name)
// } finally {
//     await session.close()
// }

// // on application exit:
// await driver.close()