//this is the controller

import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {fullName,  email, password} = req.body;

    try {


        if (!fullName || !email || !password){
            res.status(400).json({message : "You must provide all information!"});
        }
        if (password.length < 6){
            return res.status(400).json({message : "Password must be at least 6 characters"});
        }
        const user = await User.findOne({email});
        if (user){
            return res.status(400).json({message : "That email is existing already"});
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName : fullName,
            email : email,
            password : hashedPassword
        });

        if (newUser){
            //generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();
            

            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic
            })

        }
        else{
            res.status(400).json({message : "Invalid User Data"});
        }


        
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({message : "Error server"});
    }
}







export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
       const user = await User.findOne({email});

        if (!user){
            res.status(400).json({message: "Invalid credintials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect){
            res.status(400).json({message: "Invalid credintials"});
        }

        generateToken(user._id, res);
        res.status(201).json({
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePic : user.profilePic
        })

        

    } catch (error) {
        console.log("Error in login controller : ", error.message);
        res.status(500).json({message : "Server Error!"});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message : "Loged out succesfully"});
    } catch (error) {
        console.log("Error in logout controller : ", error.message);
        res.status(500).json({message : "Server Error!"});
    }
}