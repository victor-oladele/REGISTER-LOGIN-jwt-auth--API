
const User = require('../model/user')
const {badrequesterror , authenticatederror} = require('../errors')
const {StatusCodes} = require('http-status-codes')



// register user
const register = async(req , res)=>{
   const user = await User.create(req.body)
   const token = user.createjwt()
   res.status(StatusCodes.CREATED).json({ user:{name:user.name} , token })
}


// login user
const login = async(req , res) =>{
  const {email , password} = req.body
  if(!email || !password){
    throw new badrequesterror('email and password field cannot be empty')
  }
  const user = await User.findOne({email})
  if(!user){
    throw new authenticatederror('Invalid credentials')
  }
  const ispasswordmatch = await user.comparepassword(password)
  if(!ispasswordmatch){
    throw new authenticatederror('Invalid credentials')
  }
  const token = user.createjwt()

  res.status(StatusCodes.OK).json({user:{name:user.name} , token})

}


module.exports = {
    register,
    login
}

