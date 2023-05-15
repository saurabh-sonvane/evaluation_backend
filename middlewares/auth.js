const {loggedInUser}=require("../controllers/auth.controller");

const auth=async(req,res,next)=>{
    try {
        const headers=req.headers;

        const authHeader=headers.authorization;

        if(authHeader){
            const[type,token]=authHeader.split(" ");
            //console.log(type,token)

            if(type==='Bearer' && token){
                try {
                    const user=await loggedInUser(token);
                    req.user=user;
                    next();
                } catch (error) {
                    return res.status(400).send({
                        error:"Bad token"
                    })
                }
            }else{
                return res.status(400).send({
                    error:"Unidentified token provided"
                })
            }
        }else{
            return res.status(400).send({
                error:"token not present"
            })
        }

    } catch (error) {
        return res.status(500).send({
            error:error.message
        })
    }
}

module.exports={auth};