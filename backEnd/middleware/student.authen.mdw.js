
module.exports = function(req,res,next){
    console.log("HAHAHA");
    console.log(req.headers['isLogin']);
    next();
    // if(req.headers['isLogin'] == 'true'){
    //     console.log("YEAHHH");
    //     next();
    // } else{
    //     res.status(400).json({
    //         message:"Account not signed in"
    //     })
    // }
   
}