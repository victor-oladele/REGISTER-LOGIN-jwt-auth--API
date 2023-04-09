

// const {StatusCodes} = require('http-status-codes')

// const errorhandler = (err , req , res , next) =>{

//     let customerror = {
//       statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
//       msg:err.message || 'something went wrong try again later'
//     }
  
//     // error due to m ongoose validation
  
//      if(err.name === 'ValidationError'){
//       customerror.msg = Object.values(err.errors).map((item)=>item.message).join(',')
//       customerror.statusCode = 400
//      }
  
    
//     //  error due to duplicate email
//       if(err.code && err.code === 11000){
//           customerror.msg=`Duplicate value entered for email field , please choose another value`
//           customerror.statusCode = 400
//       }
  
//       // handling cast error: wrong id
//       if(err.name === 'CastError'){
//         customerror.msg = `No item found with id: ${err.value}`
//         customerror.statusCode = 400
//       }
  
//       // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err}) 
  
//       return res.status(customerror.statusCode).json({msg:customerror.msg})
  
          
//   }
  
  
  
//   module.exports = errorhandler
  
  
  
const {StatusCodes} = require('http-status-codes')

 const errorhandler = (err , req , res , next) => {

    const customerror = {
        statusCode : err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || 'something went wrong , try again later'
    }

    if(err.code  && err.code === 11000){
        customerror.msg = 'Duplicate value entered for the email field , pls choose another value'
        customerror.statusCode = 400  
      }

    if(err.name === 'ValidationError'){
        customerror.msg = Object.values(err.errors).map((item) => item.message).join(',')
        customerror.statusCode = 400
    }

    if(err.name === 'CastError'){
      customerror.msg = `There is no item with this id: ${err.value}`
      customerror.statusCode = 404
    }

      return res.status(customerror.statusCode).json({msg:customerror.msg})

 } 
  
  
  module.exports = errorhandler
  
  
  
  
  
  
  
  
  