import  ChatNickName from "../models/chatNickName.model.js";


// export const createNickNames = async (req, res) => {
//     try {
//         const {userId, partnerId} = req.body;


       

//         const newNickNames = new ChatNickName({
//             userId : partnerId,
//             nickname : ""
//         })

//         await newNickNames.save();
//         res.status(201).json({newNickNames});

//     } catch (error) {
//         console.log("Error in creating nicknames: ", error.message);
//         res.status(500).json({message : "Server Error"});
//     }
// }

export const createNickNames = async (req, res) => {
  try {
    
    const { userId, partnerId, userName, partnerName, userNickName, partnerNickName} = req.body;

    if (!userId || !partnerId || !userName || !partnerName) {
      return res.status(400).json({ message: "Fill out all details" });
    }


    const existing = await ChatNickName.find({
      $or : [
        {userId : userId, partnerId : userId},
        {userId : partnerId, partnerId : userId}
      ]
    });

    if (existing.length > 0){
      // res.status(400).json({message : "Already created in the database"});
      const updatedNickNames = await ChatNickName.bulkWrite([
        {
          updateOne : {
            filter : {userId : userId, partnerId : partnerId},
            update : {$set : {userNickName : userNickName}}
            
          }
        },
        {
          updateOne : {
            filter : {userId : partnerId, partnerId : userId},
            update : {$set : {partnerNickName : partnerNickName}}
          }
        }
      ]);
      return res.status(200).json(updatedNickNames)
    };

    

    // Create nickname documents for both users
    const newNickNames = await ChatNickName.insertMany([
      { 
        userId,
        partnerId : partnerId, 
        nickname: "", 
        userName : userName, 
        partnerName : partnerName 
      },

      { 
        userId: partnerId,
        partnerId : userId, 
        nickname: "", 
        userName : partnerName, 
        partnerName : userName 
      }
    ]);
    
    res.status(201).json(newNickNames);

  } catch (error) {
    console.log("Error in creating nicknames:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
