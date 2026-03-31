const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
	{
		month: {
			type: String,
			required: true,
		},
		sales: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ _id: false }, // prevents extra _id inside sales array
);

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},

		desc: {
			type: String,
			default: "",
		},

		img: {
			type: String,
			default:
				"https://images.unsplash.com/photo-1585386959984-a41552231658?auto=format&fit=crop&w=500&q=80&fm=webp",
		},

		categories: {
			type: [String], // ["electronics", "shoes","furniture","fashion","gaming","fitness"]
			default: ["electronics"],
		},

		price: {
			type: Number,
			required: true,
		},

		inStock: {
			type: Boolean,
			default: true,
		},

		active: {
			type: Boolean,
			default: true,
		},

		// ✅ SALES DATA FOR CHART
		sales: {
			type: [salesSchema],
			default: () =>
				["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => ({
					month: m,
					sales: 0,
				})),
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
