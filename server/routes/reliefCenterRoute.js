const express = require("express");
const { getReliefCenter,addReliefCenter, addadmission ,getAllReliefCenter, addReliefSupplyRequest, confirmDelivery } = require("../controllers/reliefCenterController");

const router = express.Router();

router.post("/addreliefcenter",addReliefCenter);
router.get("/getreliefcenterbyid/:id", getReliefCenter)
router.put("/addadmission/:id",addadmission)
router.get("/reliefcenters",getAllReliefCenter)
router.post("/addreliefsupplyrequest",addReliefSupplyRequest)
router.put("/confirmdelivery/:id",confirmDelivery)





module.exports = router;


