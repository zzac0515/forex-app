const express = require("express");
const router = express.Router();
const ratesController = require("../controllers/ratesController");

router.get("/rates", ratesController.ratesList); // rates list

module.exports = router;
