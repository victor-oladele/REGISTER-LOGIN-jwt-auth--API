

const dashboard = async(req , res)=>{
    const luckynumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`hello ${req.user.name}` , secret:`Here is your authorized data , your lucky number is ${luckynumber}`})
        
}

module.exports ={ dashboard }