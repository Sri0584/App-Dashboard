const { getUsers, getAllUsers } = require("../controllers/Analytics");

const router = require("express").Router();
//get users
router.get("/", getUsers);

router.get("/users", getAllUsers);

module.exports = router;
