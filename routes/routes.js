<<<<<<< HEAD
import dateFormat, { masks } from "dateformat";
import mongoose from "mongoose";
=======

const mongoose = require('mongoose');
>>>>>>> a34474877b685b949df6a9c87e9b226f44a7cb19

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://admin2:Pass112@cluster0.o4mbh.mongodb.net/test', {
    useUnifiedTopology: true, 
    useNewUrlParser: true
});

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

let userSchema = new mongoose.Schema({
    username: String, //visible name that others see, defaults to same as username
    password: String, //hashed one is saved
    birthDate: Date,
    starSign: String, 
    moonSign: String,
    risingSign: String
    //[possibly other details for page customisation]
}); 
const users = mongoose.model('users', userSchema);

//find one
// users.findOne({starSign: 'zodiac1' }, function (err, docs) {
//     if (err){
//         console.log(err)
//     }
//     else{
//         console.log("Result : ", docs);
//     }
// });

//delete one
// users.deleteOne({ starSign: 'zodiac4' }).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

<<<<<<< HEAD
// users.updateOne({

// })

=======
>>>>>>> a34474877b685b949df6a9c87e9b226f44a7cb19

// create an account
// const User = new users({ 
//     username: 'Username', 
//     password: 'password', 
//     birthDate: dateFormat('01-05-2001' ,"mm-dd-yyyy"),
//     starSign: 'zodiac4',
//     moonSign: 'zodiac5',
//     risingSign: 'zodiac6'
// });

// User.save();
// console.log(User);

//This works it saves data to mongo compass.
//terminal line ---node public/routes/routes.js
