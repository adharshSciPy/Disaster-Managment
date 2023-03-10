const CollectionCenter = require("../models/CollectionCenter");

module.exports = {
  
  addReliefCenter: async (req, res) => {
    const {CenterName,InCharge,AccomdationCapacity,Phone,Admission} = req.body;
    try {       
            const result = await CollectionCenter.create({              
              CenterName,
              InCharge,
              Phone,
            });
            res.status(201).json({ message: "Collection added with success"});
   
    } catch (error) {
      console.log(error.message);
    }
  },
  getAllReliefCenter : async (req,res) => {

    try {
      const user = await CollectionCenter.find()
      res.status(200).json(user)
  } catch (error) {
      res.status(500).json({message:error.message})
  }

  }
  
  }


 