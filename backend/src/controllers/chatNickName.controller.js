import  ChatNickName from "../models/chatNickName.model.js";


export const createNickNames = async (req, res) => {
    try {
        const {userId, partnerId} = req.body;

        const existingNickNames = await ChatNickName.findOne({
            "participants.userId" : { $all : [userId, partnerId]}
        });

        if (existingNickNames){
            return res.status(400).json({message : "Nicknames already exist for this chat"});
        }

       

        const newNickNames = new ChatNickName({
            participants : [
                {userId : userId, nickname : ""},
                {userId : partnerId, nickname : ""},
            ]
        })

        await newNickNames.save();
        res.status(201).json({newNickNames});

    } catch (error) {
        console.log("Error in creating nicknames: ", error.message);
        res.status(500).json({message : "Server Error"});
    }
}