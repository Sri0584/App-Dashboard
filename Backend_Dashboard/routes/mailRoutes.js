const sendMail = require("../controllers/Mail");

const router = require("express").Router();

router.post("/", sendMail);
module.exports = router;
