import mongoose from "mongoose";


// const chatNickNameSchema = mongoose.Schema({
//     participants : [
//         {
//         userId : {
//             type : mongoose.Schema.Types.ObjectId,
//             ref : "User",
//             required : true,
//         },
//         nickname : {
//             type : String,
//             default : ""
//         }
//         }
//     ]
// })

const chatNickNameSchema = mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      partnerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
      },
      userName : {
          type : String,
          required : true
      },
      partnerName : {
        type : String,
        required : true
      },
      userNickName: {
        type: String,
        default: ""
      },
      partnerNickName : {
        type : String,
        default : ""
      }
    },
    {
        timestamps : true
    },
)


const ChatNickName = mongoose.model("ChatNickName", chatNickNameSchema);
export default ChatNickName;