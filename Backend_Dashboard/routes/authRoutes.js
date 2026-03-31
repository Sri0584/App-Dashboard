const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/Auth");

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
