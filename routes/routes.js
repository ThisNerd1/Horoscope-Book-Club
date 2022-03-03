import dateFormat, { masks } from "dateformat";
import mongoose from "mongoose";
const mongoose = require('mongoose');

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


// not connected yet
const neo4j = require('neo4j-driver')

const user = 'neo4j';
const password = 'cq6HGzXHJ_dNNS3uzWhUzjjT2yunHaWtrcEvrCvElv8';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
const session = driver.session()
const personName = 'Alice'

try {
    const result = session.run(
    'CREATE (a:Person {name: $name}) RETURN a',
    { name: personName }
    )

    const singleRecord = result.records[0]
    const node = singleRecord.get(0)

    console.log(node.properties.name)
} finally {
    await session.close()
}

// on application exit:
await driver.close()