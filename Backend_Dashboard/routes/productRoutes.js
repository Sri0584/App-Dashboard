const {
	createProduct,
	getProducts,
	updateProduct,
	getProductById,
	deleteProduct,
} = require("../controllers/Product");
const { verifyToken } = require("../middleware/authMiddleware");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, createProduct);

//GET
router.get("/", getProducts);
router.get("/:id", getProductById);

router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
