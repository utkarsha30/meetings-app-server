const { Router } = require("express");
const userCtrl = require("../controllers/users.controller");
const router = Router();

router.post("/register", userCtrl.registerNewUser);
router.post("/login", userCtrl.validateUser);
module.exports = router;
