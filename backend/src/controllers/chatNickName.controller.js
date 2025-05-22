import  ChatNickName from "../models/chatNickName.model.js";

export const updatePartnerNickName = async (req, res) => {
  try {
    const {userId, partnerId, userName, partnerName, partnerNickName} = req.body;

    if (!userId || !partnerId){
      return res.status(400).json({message : "Put some id's!"});
    }

    const existingNn = await ChatNickName.find({
      $or : [ 
              {userId : userId, partnerId : partnerId}, 
              {userId : partnerId, partnerId : userId}
            ]
    });

    if (existingNn.length > 0){
      const updatedPartnerNn = await ChatNickName.bulkWrite([
       {

          updateOne : {
            filter : {userId : userId, partnerId : partnerId},
            update : {$set : {partnerNickName : partnerNickName}}
          }

       },
       {
          updateOne : {
            filter : {userId : partnerId, partnerId : userId},
            update : {$set : {userNickName : partnerNickName}}
          }
       }
      ]);

      return res.status(200).json(updatePartnerNickName);


    }

    res.status(404).json({message : "No nickname found in the database!"});
    


  } catch (error) {
    console.log("Error in updating Partner NickName: ", error.message);
    res.status(500).json({message : "Server Error"});
  }
}

export const updateUserNickName = async (req, res) => {
  try {
    const { userId, partnerId, userName, partnerName, userNickName} = req.body;

    if (!userId || !partnerId){
      return res.status(400).json({message : "Put some id's!"});
    };

    const existingNn = await ChatNickName.find({
      $or : [{userId : userId, partnerId : partnerId}, {userId : partnerId, partnerId : userId}]
    });

    if (existingNn.length > 0){
        const updatedUserNn = await ChatNickName.bulkWrite(
          [
            {
              updateOne : {
                filter : {userId : userId, partnerId : partnerId},
                update : {$set : {userNickName : userNickName}}
              }
            },

            {
              updateOne : {
                filter : {userId : partnerId, partnerId : userId},
                update : {$set : {partnerNickName : userNickName}}
              }
            }
          ]
      );

      return res.status(200).json(updatedUserNn);


    }

    res.status(404).json({message : "No nickname found in the database!"});

  } catch (error) {
    console.log("Error in updating User NickName: ", error.message);
    res.status(500).json({message : "Server Error"});
  }
}


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
            update : {$set : {userNickName : userNickName, partnerNickName : partnerNickName}}
            
          }
        },
        {
          updateOne : {
            filter : {userId : partnerId, partnerId : userId},
            update : {$set : {partnerNickName : userNickName, userNickName: partnerNickName}}
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


export const getNickNames = async (req, res) => {
  try {
    
    const {id : partnerId} = req.params;
    const userId = req.user._id;

    // const nicknamesData = await ChatNickName.find({
    //   $or : [
    //     {userId : userId, partnerId : partnerId}, 
    //     {userId : partnerId, partnerId : userId}
    //   ]
    // });

    const nicknamesData = await ChatNickName.findOne({
      userId : userId,
      partnerId : partnerId
    })

    if (nicknamesData){
      return res.status(200).json(nicknamesData);
    }

    // if (nicknamesData.length > 0){

    //   //test
    //   const nickname = await ChatNickName.find({
    //     userId : userId,
    //     partnerId : partnerId
    //   })
    //   return res.status(200).json(nickname);
    //   // return res.status(200).json(nicknamesData);
    // }



    res.status(404).json({message : "Nicknames not in database"});

    if (nicknamesData.length <= 0){
      return res.status(404).json({message : "Nicknames not in database"})
    }

  } catch (error) {
    console.log("Error in getting NickNames: ", error.message);
    res.status(500).json({message : "Server Error"});
  }
}