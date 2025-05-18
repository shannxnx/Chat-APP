export const changeChatNn = async (req, res) => {

}


// export const changeChatNn = async (req, res) =>{
//     try {
//         const {NickName} = req.body;
//         const loggedInUserID = req.user._id;
//         const partnerID = req.params.id;

//         const chatNN = await ChatBg.findOne({
//             participants : {$all : [loggedInUserID, partnerID]}
//         })
        
//         if (!chatNN){
//             const newNn = new ChatBg({
//                 participants : [loggedInUserID, partnerID],
//                 userNickName : {
//                     id : loggedInUserID,
//                     NickName : ""
//                 },
//                 partnerNickName : {
//                     id : partnerID,
//                     NickName : NickName
//                 }
//             });

//             await newNn.save();
//             res.status(201).json({newNn});
//         };


//         // const updatedNN = await ChatBg.findOneAndUpdate(
//         //     { participants: { $all: [loggedInUserID, partnerID] } },
//         //     { $set: { chatNickName: NickName } },
//         //     { new: true }
//         // );

//         const updatedNN = await ChatBg.findOneAndUpdate({participants : {$all : [loggedInUserID, partnerID]}}, 
//             {
//                 $set : {
//                     "partnerNickName.id" : partnerID,
//                     "partnerNickName.NickName" : NickName
//                 }
//             },
//             {new : true});
        
//         res.status(201).json({updatedNN})

        





//     } catch (error) {
//         console.log("Error in changing NICKNAME : ", error.message);
//         res.status(500).json({message : "Server Error"})
//     }
// }

