const router = require("express").Router();
const {
	createTransaction,
	getTransactions,
} = require("../controllers/Transaction");

// CREATE
router.post("/", createTransaction);

// GET ALL
router.get("/", getTransactions);

module.exports = router;
