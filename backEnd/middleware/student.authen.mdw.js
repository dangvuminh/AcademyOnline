module.exports = function(req,res,next){
    if(req.headers['isLogin'] == true){
        next();
    }
    res.status(400).json({
        message:"Account not signed in"
    })
}