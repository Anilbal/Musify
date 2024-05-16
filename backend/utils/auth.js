const jwt=require("jsonwebtoken")

exports.authJwt=(req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(400).json({error:"Error!Token was not provided."})
    }

    let decodedToken=jwt.verify(token,process.env.SECRET_KEY)
    req.user=decodedToken
    next()
}