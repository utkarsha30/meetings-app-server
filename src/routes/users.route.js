const { Router } = require("express");
const userCtrl = require("../controllers/users.controller");
const router = Router();

router.get("/", userCtrl.getAllUsers);
module.exports = router;
