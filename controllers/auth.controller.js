require('dotenv').config();
const axios=require('axios');
const User=require('../models/user.model');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const TOKEN_SECRET_KEY=process.env.TOKEN_SECRET_KEY;

const createToken=(details)=>{
    return jwt.sign(details,TOKEN_SECRET_KEY);
}

const verifyToken=(token)=>{
    return jwt.verify(token,TOKEN_SECRET_KEY);
}

const RegisterUser=async (data)=>{
    let Exist=await User.findOne({email:data.email});

    if(Exist){
        throw new Error("Email already present")
    }

    try {
        const hash=bcrypt.hashSync(data.password,4);
        let response=await User.create({name:data.name,email:data.email,gender:data.gender,password:hash});
        let json=response.toJSON();

        return {registered:json}
    } catch (error) {
        throw new Error("There is an internal Problem in register controller");
    }
}

const LoginUser=async (data)=>{

    try {

        const {email,password}=data;
        let Exist=await User.findOne({email:email});
        let json=Exist.toJSON();

        if(!Exist){
           // throw new Error("Email already present")
           throw new error({statuscode:404,message:"Please register first"})
        }else{
            let decoded=bcrypt.compareSync(password,Exist.password);
            if(decoded){
                let token=createToken(json)
                return {Token:token};
            }else{
                throw new error({statuscode:401,message:"Incorrect Password"})
            }
        }
    } catch (error) {
        throw new error({statuscode:500,message:"There is an internal Problem in Login controller"})
    }
}

const loggedInUser=async (token)=>{
    let user=verifyToken(token);
    return user;
}

module.exports={RegisterUser,LoginUser,loggedInUser};