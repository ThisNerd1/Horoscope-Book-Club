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

// users.updateOne({

// })


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
    
    let email = req.body.Email;
    let password = req.body.Password;
    
    
    users.find({
        "email": email
    }, (err, obj)=>{
        console.log(obj[0].password)
        if(obj == null){
            console.log("I'm sorry we couldn't find that user, please try again.")
        }else{
            if(!bcrypt.compareSync(password, obj[0].password)){
                console.log("I'm sorry we couldn't find that user, please re-enter your password.")
            }else{
                next();
            }
        }
    });
    
    
    
}


// console.log(User);

//This works it saves data to mongo compass.
//terminal line ---node public/routes/routes.js
