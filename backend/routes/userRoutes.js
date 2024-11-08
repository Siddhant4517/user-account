const express = require("express");
const { getUserById, updateUser } = require("../controllers/userControllers");

const router = express.Router();

router.get("/account/:userId", getUserById);
router.put("/account/:userId", updateUser);

module.exports = router;
