const teamsService = require("../services/teams.service");
const usersService = require("../services/users.service");
const { Errors } = require("../constants");
const postNewTeam = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have for creating new FAQ`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    //res.locals.clamins have local instance of logged in user
    const loggedinUser = res.locals.claims;
    req.body.members.push({
      userId: loggedinUser._id,
      email: loggedinUser.email,
    });

    const newTeam = await teamsService.postNewTeam(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    next(error);
  }
};

const getUsersTeams = async (req, res, next) => {
  try {
    const loggedinUser = res.locals.claims;
    const userAllTeams = await teamsService.getUsersTeams(loggedinUser._id);
    res.status(200).json(userAllTeams);
  } catch (error) {
    next(error);
  }
};
const addMember = async (req, res, next) => {
  const { id } = req.params;
  try {
    //this will check if the action is not add member then it will router to next router action
    //this step is needed as both add and remove members have same url and same api
    if (req.query.action !== "add_member") {
      next("route");
    }
    if (req.query.userId) {
      const userId = req.query.userId;
      const user = await usersService.getUserById(userId);
      if (!user) {
        const error = new Error(`Employee with ${id} does not exist`);
        error.name = Errors.NotFound;
        return next(error);
      }
      const updatedTeam = await teamsService.addMember(id, userId, user.email);
      res.status(200).json(updatedTeam);
    } else if (req.query.email) {
      console.log("email present");
    }
  } catch (error) {
    next(error);
  }
};
const removeMember = async (req, res, next) => {
  try {
    if (req.query.action !== "remove_member") {
      next("route");
    }
    const loggedinUser = res.locals.claims;
    const { id } = req.params;
    const team = await teamsService.getTeamById(id);
    if (!team) {
      const error = new Error(`Team with ${id} does not exist`);
      error.name = Errors.NotFound;
      next(error);
    } else {
      const updatedTeam = await teamsService.removeMemberFromTeam(
        id,
        loggedinUser._id,
        loggedinUser.email
      );
      res.status(200).json(updatedTeam);
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  postNewTeam,
  getUsersTeams,
  addMember,
  removeMember,
};
