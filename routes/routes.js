const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


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
    birthDate: Date,
    email: String
    // starSign: String, 
    // moonSign: String,
    // risingSign: String
    //[possibly other details for page customisation]
}); 
const users = mongoose.model('users', userSchema);

//delete one
// users.deleteOne({ starSign: 'zodiac4' }).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

// exports.deleteUser = (req, res, next) => {
//     const User = new users({ 
//         Name: req.body.name, 
//         password: hash, 
//         birthDate: req.body.birthday,
//         email: req.body.email
//     });
// }

//create an account
exports.createUser = (req, res, next) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    const User = new users({ 
        Name: req.body.name, 
        password: hash, 
        birthDate: req.body.birthday,
        email: req.body.email
    });
    User.save();
    next();
}

exports.loginUser = (req, res, next) => {
    const email = {email : req.body.Email}
    users.find(email, (err,user) => {
        if(err) return console.error(err);
        console.log(user);
        //console.log(bcrypt.compareSync(req.body.password, user.password))
        console.log(user[0].email);
        if(bcrypt.compareSync(req.body.password, user[0].password))
        {
            req.session.user = {
                isAuthenticated: true,
                email: req.body.email
            }
            next();
        }
        else{
            res.redirect('/');
        }
    })
}

    
//     users.find({
//         "email": email
//     }, (err, obj)=>{
//         // console.log(obj[0].Password);
//         if(obj == null){
//             console.log("I'm sorry we couldn't find that user, please try again.")
//         }else{
//             if(!bcrypt.compareSync(password, obj[0].password)){
//                 console.log("I'm sorry we couldn't find that user, please re-enter your password.")
//             }else{
//                 next();
//             }
//         }
//     });
// }

exports.editUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    users.updateOne({email: email, password: password}, {
        email : req.body.Email,
        password : req.body.password
    })
    users.save();
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