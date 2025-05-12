import ChatBg from "../models/chatBG.model.js"

export const getChatBg = async (req, res) => {
    try {
        
        const loggedInUserId = req.user._id;
        const participantId = req.params.id;
        const chatBg = await ChatBg.findOne({
            participants : {$all : [loggedInUserId, participantId]}
        }).populate("participants", "fullName email");

        if (!chatBg){
            return res.status(404).json({message : "No chat bg found"});

        }

        res.status(200).json({ backgroundColor : chatBg.chatBackground});

    } catch (error) {
        console.log("Error in getting chatBG", error.message);
        res.status(500).json({message : "Error server"})
    }
}


export const changeChatBg = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const participantId = req.params.id;

        const {chatBackground} = req.body;

        const newBg = new ChatBg({
            participants : [loggedInUserId, participantId],
            chatBackground : chatBackground});
        await newBg.save();

        res.status(200).json({
            participants : [loggedInUserId, participantId],
            chatBackground : chatBackground
        })

    } catch (error) {
        console.log("Error in customizing chatBG", error.message);
        res.status(500).json({message : "Error server"})
    }
}