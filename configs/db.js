const mongoose = require("mongoose");
require('dotenv').config();
const URL=process.env.MONGO_URL;

const connectToDatabase=async()=>{
    try {
        let response=await mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log("db server")
    } catch (error) {
        console.log("error in connecting database");
    }
}

module.exports=connectToDatabase;