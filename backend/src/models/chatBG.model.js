import mongoose from "mongoose";


const chatBgSchema = new mongoose.Schema({
    participants : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],
    chatBackground : {
        type : String,
        default : "#FFFFFF",
    },
});


const ChatBg = mongoose.model("ChatBg", chatBgSchema);

export default ChatBg;