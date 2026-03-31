const Product = require("../models/Product");

// ✅ CREATE PRODUCT
const createProduct = async (req, res) => {
	try {
		const { title, price, img, inStock, active, categories } = req.body;

		// ✅ Basic validation
		if (!title || !price) {
			return res.status(400).json("Title and price are required");
		}

		// ✅ Create product with defaults
		const newProduct = new Product({
			title,
			price,
			img: img || "",
			inStock: inStock ?? true,
			active: active ?? true,

			// ✅ Default sales data (important for your chart)
			sales: [
				{ month: "Jan", sales: 0 },
				{ month: "Feb", sales: 0 },
				{ month: "Mar", sales: 0 },
			],
			categories: categories || "electronics",
		});

		const savedProduct = await newProduct.save();

		res.status(201).json(savedProduct);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

// ✅ GET ALL PRODUCTS
const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.json(product);
	} catch (err) {
		res.status(500).json(err);
	}
};

// ✅ UPDATE PRODUCT
const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ returnDocument: "after" },
		);

		if (!updatedProduct) {
			return res.status(404).json("Product not found");
		}

		res.status(200).json(updatedProduct);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

// ✅ DELETE PRODUCT
const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedProduct = await Product.findByIdAndDelete(id);
		if (!deletedProduct) {
			return res.status(404).json("Product not found");
		}
		res.json({ message: "Product deleted successfully" });
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createProduct,
	getProducts,
	updateProduct,
	getProductById,
	deleteProduct,
};
