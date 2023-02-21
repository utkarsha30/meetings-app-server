const calendarService = require("../services/calendar.service");
const getMeetingsByDate = async (req, res, next) => {
  const givenDate = req.query.date;
  const loggedinUser = res.locals.claims;
  try {
    const viewMeetings = await calendarService.getMeetingsByDate(
      givenDate,
      loggedinUser._id
    );
    res.status(200).json(viewMeetings);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getMeetingsByDate,
};
