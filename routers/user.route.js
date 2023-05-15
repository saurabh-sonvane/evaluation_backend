const express=require('express');
const router=express.Router();
const {RegisterUser,LoginUser}=require('../controllers/auth.controller');
const {auth} =require('../middlewares/auth');


router.post('/register',async (req,res)=>{
    try {
        let response=await RegisterUser(req.body);
        res.send(response);
    } catch (error) {
        res.status(400).send({error:error.message});
    }
})

router.post('/login',async (req,res)=>{
    try {
        let response=await LoginUser(req.body);
        res.send(response);
    } catch (error) {
        res.status(400).send({error:error.message});
    }
})

router.post('/loggedInUser',auth,async (req,res)=>{
    try {
        const user=req.user;
        return res.send({
            data:user
        })
    } catch (error) {
        res.status(500).send({error:error.message});
    }
})

router.get('/register',(req,res)=>{
    res.send("Register")
})

module.exports=router;