import mongoose from "mongoose";


const chatNickNameSchema = mongoose.Schema({
    participants : [
        {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        nickname : {
            type : String,
            default : ""
        }
        }
    ]
})


const ChatNickName = mongoose.model("ChatNickName", chatNickNameSchema);
export default ChatNickName;