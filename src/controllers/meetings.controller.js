const meetingsService = require("../services/meetings.service");
const usersService = require("../services/users.service");
const { Errors } = require("../constants");

const postNewMeeting = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have for creating new Meeting`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    //res.locals.clamins have local instance of logged in user
    const loggedinUser = res.locals.claims;
    const allUsers = await usersService.getAllUsers();
    const userEmails = req.body.attendees;
    let attendees = [];
    userEmails.forEach((email) => {
      allUsers.forEach((user) => {
        if (user.email === email) {
          attendees.push({
            userId: user._id,
            email: user.email,
          });
        }
      });
    });

    attendees.push({
      userId: loggedinUser._id,
      email: loggedinUser.email,
    });
    req.body.attendees = attendees;

    const newMeeting = await meetingsService.postNewMeeting(req.body);
    res.status(201).json(newMeeting);
  } catch (error) {
    next(error);
  }
};
const addAttendee = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (req.query.action !== "add_attendee") {
      return next("route");
    }
    if (req.query.userId) {
      const userId = req.query.userId;
      const user = await usersService.getUserById(userId);
      if (!user) {
        const error = new Error(`Employee with ${id} does not exist`);
        error.name = Errors.NotFound;
        return next(error);
      }
      const updatedMeeting = await meetingsService.addAttendee(
        id,
        userId,
        user.email
      );
      res.status(200).json(updatedMeeting);
    } else if (req.query.email) {
      console.log("email present");
    }
  } catch (error) {
    next(error);
  }
};
const removeAttendee = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (req.query.action !== "remove_attendee") {
      return next("route");
    }
    const loggedinUser = res.locals.claims;
    const meeting = await meetingsService.getMeetingBId(id);
    if (!meeting) {
      const error = new Error(`Meeting with ${id} does not exist`);
      error.name = Errors.NotFound;
      return next(error);
    } else {
      const updatedMeeting = await meetingsService.removeAttendee(
        id,
        loggedinUser._id,
        loggedinUser.email
      );
      res.status(200).json(updatedMeeting);
    }
  } catch (error) {
    next(error);
  }
};
const getMeeting = async (req, res, next) => {
  const todaysDate = new Date().toISOString().substring(0, 10);
  var search = " ";
  const loggedinUser = res.locals.claims;
  try {
    if (!req.query.search) {
      search = " ";
    } else {
      search = req.query.search;
    }
    switch (req.query.period) {
      case "past":
        const pastMeetings = await meetingsService.getMeetingFromPast(
          todaysDate,
          search,
          loggedinUser._id
        );
        res.status(200).json(pastMeetings);
        break;
      case "future":
        const futureMeetings = await meetingsService.getMeetingFromFuture(
          todaysDate,
          search,
          loggedinUser._id
        );
        res.status(200).json(futureMeetings);
        break;
      case "present":
        const presentMeetings = await meetingsService.getMeetingForPresent(
          todaysDate,
          search,
          loggedinUser._id
        );
        res.status(200).json(presentMeetings);
        break;
      case "all":
        const all = await meetingsService.getAllMeetings(
          search,
          loggedinUser._id
        );
        res.status(200).json(all);
        break;
      default:
        const allMeetings = await meetingsService.getAllMeetings(
          search,
          loggedinUser._id
        );
        res.status(200).json(allMeetings);
        break;
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  postNewMeeting,
  addAttendee,
  removeAttendee,
  getMeeting,
};
