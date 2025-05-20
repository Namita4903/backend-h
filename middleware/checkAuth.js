const jwt = require("jsonwebtoken")
const checkAuth=(req,res,next)=>{
    try{
        const token =req.headers.authorization.split[""][1];
        console.log("good vibes",token);
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        console.log("bad vibes",decoded);

        next();

    }catch(error){
        return res.status(401).json({
            message:"Invalid Token !!"
        });
    }
}
module.exports=checkAuth;






























