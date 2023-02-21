const { Router } = require("express");
const calendarCtrl = require("../controllers/calendar.controller");
const { authenticate } = require("../middleware/auth");
const router = Router();
router.get("", authenticate, authenticate, calendarCtrl.getMeetingsByDate);
module.exports = router;
