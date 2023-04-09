const customapierror = require('./customerror')
const {StatusCodes} = require('http-status-codes')


class authenticatederror extends customapierror{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}


module.exports = authenticatederror