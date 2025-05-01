import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        //this returns all the users except the logged in user and the password
        //$ne = not equal
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getting users (sidebar): ", error.message);
        res.status(500).json({message : "Error Server"});
    }
}