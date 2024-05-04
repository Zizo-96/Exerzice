const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUp = async (req,res)=>{
    try {
        let {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.send({message:"All fields are required"});
        }
        let registeredUser= await User.findOne({email});
        if (registeredUser){
            return res.send({message:"User is already registered, please logIn or use a different email address"}
            );
        }
    
        let hashPassword =  await bcrypt.hash(password, +process.env.SALT_ROUND)
        // console.log(hashPassword);
        await User.create({username, email, password: hashPassword});
        return res.send({message:"Registered successfully"});
    } catch (error) {
        console.log(error);
        return res.send("Internal server error, can't signUp at the moment");
    }
};

const logIn = async (req,res)=>{
    try {
        let {email, password} = req.body;
        if (!email || !password){
            return res.send({message:"Please fill out email and password fields"});
        }
        let user = await User.findOne({email});
        if(!user){
            return res.send({message:"User not found, please check your email address or signUp"});
        }
        let isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            return res.send({message:"Invalid or wrong password"});
        }
        let token = jwt.sign(
            {email: user.email, id: user._id},
            process.env.SECRET_KEY
        );
        res.send({message: "LogIn successfully", token});

    } catch (error) {
        console.log(error)
        return res.send({ message:"Internal server error, can't logIn at this moment" })
    }
};

module.exports = {signUp, logIn}
