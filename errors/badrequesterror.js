const customapierror = require('./customerror')
const {StatusCodes} = require('http-status-codes')


class badrequesterror extends customapierror{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}


module.exports = badrequesterror