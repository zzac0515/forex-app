const express = require("express");
const router = express.Router();
const currenciesController = require("../controllers/currenciesController");

router.get("/", currenciesController.currenciesList); // currencies list

module.exports = router;
