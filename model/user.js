
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'pls provide your name'],
        minlength:3
    },
    email:{
        type:String,
        required:[true , 'pls provide your email'],
        unique:true
    },
    password:{
        type:String,
        required:[true , 'pls provide your password'],
        minlength:3
    }
})

// hashing the password using the mongoose middleware pre method
userschema.pre('save' , async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
})


// Assigning jwt to the user using the mongoose schema instance method
userschema.methods.createjwt = function(){
    return jwt.sign({userid:this._id , name:this.name} , process.env.JWT_SECRET , {expiresIn:process.env.JWT_EXPIREDIN})
}

userschema.methods.comparepassword = async function(candidatepassword){
 const ismatch = await bcrypt.compare(candidatepassword , this.password)
 return ismatch
}




module.exports = mongoose.model('users' , userschema)