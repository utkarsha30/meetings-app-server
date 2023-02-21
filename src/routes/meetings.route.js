const { Router } = require("express");
const meetingsCtrl = require("../controllers/meetings.controller");
const { authenticate } = require("../middleware/auth");
const router = Router();

router.get("/", authenticate, meetingsCtrl.getMeeting);
router.patch("/:id", authenticate, meetingsCtrl.addAttendee);
router.patch("/:id", authenticate, meetingsCtrl.removeAttendee);
router.post("/", authenticate, meetingsCtrl.postNewMeeting);
module.exports = router;
