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
    
    const { userId, partnerId, userName, partnerName } = req.body;

    if (!userId || !partnerId || !userName || !partnerName) {
      return res.status(400).json({ message: "Fill out all details" });
    }

    // Check if nickname documents already exist for both users
    const existingNickNames = await ChatNickName.find({
      userId: { $in: [userId, partnerId] }
    });

    // if (existingNickNames.length > 0) {
    //   return res.status(400).json({ message: "Nicknames already exist for one or both users" });
    // }

    // Create nickname documents for both users
    const newNickNames = await ChatNickName.insertMany([
      { userId, nickname: "", name : userName },
      { userId: partnerId, nickname: "", name : partnerName }
    ]);
    
    res.status(201).json(newNickNames);

  } catch (error) {
    console.log("Error in creating nicknames:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
