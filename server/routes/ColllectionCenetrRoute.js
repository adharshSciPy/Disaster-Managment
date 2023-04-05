const express = require("express");
const CollectionCenterController = require("../controllers/CollectionCenterController");
const router = express.Router();



router.post("/addCollectioncenter", CollectionCenterController.addReliefCenter);
router.get("/getCollectionCenter", CollectionCenterController.getAllReliefCenter);
router.put("/acceptDelivery/:id",CollectionCenterController.AcceptDelivery);
router.put("/dispatch/:id",CollectionCenterController.DispatchItem)


module.exports = router;
