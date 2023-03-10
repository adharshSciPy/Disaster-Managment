const ReliefCenter = require("../models/reliefCenter");
const ReliefSupply = require("../models/reliefSupply")

module.exports = {

  addReliefCenter: async (req, res) => {
    const { CenterName, InCharge, Capacity, Phone, Admission } = req.body;
    try {
      console.log(req.body)
      const result = await ReliefCenter.create({
        CenterName,
        InCharge,
        Phone,
        Capacity,
        Admission
      });
      res.status(201).json({ message: "Relief Center added with success" });
    } catch (error) {
      console.log(error.message);
    }
  },

  getReliefCenter: async (req, res) => {
    const id = req.params.id;
    console.log(id, "id vanno");
    try {
      const userdata = await ReliefCenter.findById(id);
      // const data = {
      //   firstName: userdata.firstName,
      //   LastName: userdata.lastNameName,
      //   email: userdata.email,
      // }
      res.status(200).json(userdata)

    } catch (error) {
      return res.status(401).json({
        message: 'Get Req Failed'
      });
    }
  },

  addadmission: async (req, res) => {
    const id = req.params.id;
    const {Admission } = req.body;
    
    try {
      const userdata = await ReliefCenter.updateOne({id}, {
        $set:{
          Admission
        }
      });
      res.status(200).json(userdata)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  getAllReliefCenter : async (req,res) => {

    try {
      const user = await ReliefCenter.find()
      res.status(200).json(user)
  } catch (error) {
      res.status(500).json({message:error.message})
  }

  },


  addReliefSupplyRequest: async (req, res) => {
    const { CenterName,Phone,ItemName,Qunatity,Status,AcceptedBy,Delivered} = req.body;
    try {
      console.log(req.body)
      const result = await ReliefSupply.create({
        CenterName,
        Phone,
        ItemName,
        Qunatity,
        Status,
        AcceptedBy,
        Delivered
      });
      res.status(201).json({ message: "Relief Supply Request Sent" });
    } catch (error) {
      console.log(error.message);
    }
  },


  // confirmReliefSupplyRequest : async (req, res) => {
  //   const {}
  // }















}


