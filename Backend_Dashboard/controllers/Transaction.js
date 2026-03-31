const Transaction = require("../models/Transaction");

const createTransaction = async (req, res) => {
	try {
		const tx = new Transaction(req.body);
		const saved = await tx.save();

		// emit real-time event
		req.app.get("io").emit("newTransaction", saved);

		res.json(saved);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getTransactions = async (req, res) => {
	const transactions = await Transaction.find()
		.sort({ createdAt: -1 })
		.limit(10);

	res.json(transactions);
};

module.exports = { getTransactions, createTransaction };
