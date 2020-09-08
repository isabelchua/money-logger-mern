const Transaction = require("../models/Transaction");

// @desc Get all transactions
// @route /api/v1/transactions
// @access Public

exports.getTransactions = async (req, res, next) => {
	//res.send("GET transactions");
	try {
		const transactions = await Transaction.find();

		return res.status(200).json({
			success: true,
			count: transactions.length,
			data: transactions
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: "Server Error"
		});
	}
};

// @desc Add transactions
// @route POST /api/v1/transactions
// @access Public

exports.addTransaction = async (req, res, next) => {
	//res.send("POST transaction");
	try {
		const { text, amount } = req.body;

		const transaction = await Transaction.create(req.body);

		return res.status(201).json({
			sucess: true,
			data: transaction
		});
	} catch (err) {
		//console.log(err);
		if (err.name === "ValidationError") {
			const messages = Object.values(err.errors).map(val => val.message);

			return res.status(400).json({
				success: false,
				error: messages
			});
		} else {
			return res.status(500).json({
				success: false,
				error: "Server Error"
			});
		}
	}
};

// @desc Delete transaction
// @route DELETE /api/v1/transactions/:id
// @access Public

exports.deleteTransaction = async (req, res, next) => {
	//res.send("DELETE transaction");
	try {
		const transaction = await Transaction.findById(req.params.id);

		if (!transaction) {
			return res.status(404).json({
				success: false,
				error: "No transaction found"
			});
		}
		await transaction.remove();

		return res.status(200).json({
			success: true,
			data: {}
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: "Server Error"
		});
	}
};
