const express = require("express");
const CollectionCenterController = require("../controllers/CollectionCenterController");
const router = express.Router();



router.post("/addCollectioncenter", CollectionCenterController.addReliefCenter);
// router.get(`/reliefcenter/:id`,UserController.getUser)





module.exports = router;
