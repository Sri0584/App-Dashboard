const {
	getUsers,
	deleteUser,
	createUser,
	getUserById,
	updateUser,
} = require("../controllers/User");
const { verifyToken } = require("../middleware/authMiddleware");

const router = require("express").Router();

//get users
router.get("/", getUsers);
router.post("/", verifyToken, createUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUserById);
// UPDATE USER ✅
router.put("/:id", verifyToken, updateUser);

module.exports = router;
