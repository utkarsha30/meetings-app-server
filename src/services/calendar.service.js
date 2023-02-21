const mongoose = require("mongoose");
const Meetings = mongoose.model("Meetings");

const getMeetingsByDate = (givenDate, id) => {
  return Meetings.find({
    $and: [
      {
        "attendees.userId": id,
      },
      {
        date: {
          $eq: new Date(givenDate),
        },
      },
    ],
  });
};
module.exports = {
  getMeetingsByDate,
};
