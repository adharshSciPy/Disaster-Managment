const express = require("express");
const { getReliefCenter,addReliefCenter, addadmission ,getAllReliefCenter, addReliefSupplyRequest } = require("../controllers/reliefCenterController");

const router = express.Router();



router.post("/addreliefcenter",addReliefCenter);
router.get("/getreliefcenterbyid/:id", getReliefCenter)
router.put("/addadmission/:id",addadmission)
router.get("/reliefcenters",getAllReliefCenter)
router.post("/addreliefsupplyrequest",addReliefSupplyRequest)
// router.get(`/reliefcenter/:id`,UserController.getUser)





module.exports = router;


