const jwt=require("jsonwebtoken")

const validateToken=async(req,res,next)=>{
    const token = req.cookies.token;
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                return res.status(401).json({message:"user is not authorized"})
            }
            req.user=decoded
            next();
        })
    }
    else{
      return res.redirect("/login")
        //return res.status(401).json({ message: "user is not authorized" });
    }
   
}

module.exports=validateToken