//this is the controller

import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {fullName,  email, password} = req.body;

    try {

        //check first if all the req is filled out
        if (!fullName || !email || !password){
            res.status(400).json({message : "You must provide all information!"});
        }

        //check if the password is greater than 6
        if (password.length < 6){
            return res.status(400).json({message : "Password must be at least 6 characters"});
        }

        //check if the email exist
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

       //check if the user is in the database
        if (!user){
            res.status(400).json({message: "Invalid credintials"});
        }


        //check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect){
            res.status(401).json({message: "Invalid credintials"});
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


export const updateProfile = async (req, res) => {
    
}