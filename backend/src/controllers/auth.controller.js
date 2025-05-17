//this is the controller

import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {fullName,  email, password} = req.body;

    try {

        //check first if all the req is filled out
        if (!fullName || !email || !password){
            return res.status(400).json({message : "You must provide all information!"});
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

            //this means you are authenticated
            //generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();              //save the new user data to the database
            

            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic,
                
            })

        }
        else{
           return res.status(400).json({message : "Invalid User Data"});
        }


        
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({message : "Error server"});
    }
}







export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email})  
        const userNn = await User.findOne({email}).select("nickName");

        
       //check if the user is in the database
        if (!user){
            res.status(400).json({message: "Invalid credentials"});
        }

        //THIS IS A TEST CODE
        const userInfo = null;
        if (user){
            userInfo = await User.findById(user._id).select("-password");
        }


        //check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect){
            res.status(401).json({message: "Invalid credentials"});
        }

        generateToken(user._id, res);
        res.status(201).json({
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePic : user.profilePic,
            
        });
        
        //THIS IS A TEST CODE
        // res.status(201).json({userInfo});

        

    } catch (error) {
        console.log("Error in login controller : ", error.message);
        res.status(500).json({message : "Server Error!"});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});                          //were just removing the token, means you are no longer authenticated
        res.status(200).json({message : "Loged out succesfully"});
    } catch (error) {
        console.log("Error in logout controller : ", error.message);
        res.status(500).json({message : "Server Error!"});
    }
}


export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if (!profilePic){
            return res.status(400).json({message : "Profile pic require"});
        }

        const uploadRes = await cloudinary.uploader.upload(profilePic);


        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic : uploadRes.secure_url}, {new : true});

        res.status(200).json(updatedUser);


    } catch (error) {
        console.log("Error in profile controller : ", error.message);
        res.status(500).json({message : "Server error"});
    }
}


export const checkAuth = async (req, res) => {
    try {
        const userId = req.user._id;
        const authUserData = await User.findById(userId).select("-password");
        res.status(200).json(authUserData);
        
        // res.status(200).json(req.user);   //this shi is allowed too
    } catch (error) {
        console.log("Error in checkAuth controller : ", error.message);
        res.status(500).json({message : "Server error"});
    }
}


export const getUserInfo = async (req, res) => {
    

    try {
        const userId = req.user._id;

        const userInfo = await User.find({_id : userId}).select("-password");

        res.status(201).json(userInfo);
        
    } catch (error) {
        console.log("Error in getting user info : ", error.message);
        res.status(500).json({message : "Server error"});
    }
}


export const getAllUsers = async (req, res) => {
    
    try{

        const userId = req.user._id;
        const allUsers = await User.find({_id : {$ne : userId}}).select("-password"); //this will return all users except urself or the authenticated user
        res.status(201).json(allUsers);


    }catch(error){
        console.log("Error in getting all users: ", error.message);
        res.status(500).json({message : "Error server"});
    }
}

//------------TEST-----------------
//change of plan this is not for nickName chat this for nickName that's in the profile
//where everybody can see   
export const updateNickName = async (req, res) => {
    const {nickName} = req.body;

    try {
        
        const userId = req.user._id;

        const updateNn = await User.findByIdAndUpdate(userId, {nickName : nickName}, {new : true});

        res.status(200).json(updateNn);

    } catch (error) {
        console.log("Error in updating nickname: ", error.message);
        res.status(400).json({message : "Error Server"});
    }


};

export const getNickNameChat = async (req, res) => {
    const {id : recieverId} = req.params;
    try {
        
        const userId = req.user._id;

        const nickNames = await User.find({$and : [recieverId, userId]}).select("nickName fullName");

        res.status(200).json(nickNames);
        

    } catch (error) {
        console.log("Error in getting NickName : ", error.message);
        res.status(400).json({message : "Server Error"});
    }
}