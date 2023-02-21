const { Router } = require("express");
const teamsCtrl = require("../controllers/teams.controller");
const { authenticate } = require("../middleware/auth");
const router = Router();

router.get("/", authenticate, teamsCtrl.getUsersTeams);
router.patch("/:id", authenticate, teamsCtrl.addMember);
router.patch("/:id", authenticate, teamsCtrl.removeMember);
router.post("/", authenticate, teamsCtrl.postNewTeam);
module.exports = router;
