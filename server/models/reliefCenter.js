const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReliefCenterSchema = new Schema(
  {
    CenterName: {
      type: String,
      required: true
    },
    InCharge: {
      type: String,
      required: true
    },
    Capacity:{
      type : Number,
      required : true
    },
    Phone: {
      type: String,
      required: true
      
    }, 
    Admission: {
      type: Number,
      required: true
    }
},
  
  { timestamps: true }

);

module.exports = mongoose.model("reliefCenter", ReliefCenterSchema);
