const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReliefSupplySchema = new Schema(
    {
        CenterName: {
            type: String,
            required: true,
        },
        Phone: {
            type: String,
            required: true,
        },
        ItemName:{
            type: String,
            required: true
        },
        Qunatity:{
            type: String,
            required: true
        },
        Status : {
            type : String,
            required : true,
            default : "pending"
        },
        AcceptedBy : {
            type: String,
            required : false,
        },
        Delivered :{
            type: Boolean,
            required : false
        }

    },

    { timestamps: true }

);

module.exports = mongoose.model("ReliefSupply", ReliefSupplySchema);
