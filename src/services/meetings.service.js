const mongoose = require("mongoose");
const Meetings = mongoose.model("Meetings");
const postNewMeeting = (details) => {
  return Meetings.create(details);
};

const getMeetingBId = (id) => {
  const meetingId = mongoose.Types.ObjectId(id);
  return Meetings.findById(meetingId);
};
const addAttendee = async (id, attendeeId, attendeeEmail) => {
  const meetingId = mongoose.Types.ObjectId(id);
  const result = await Meetings.findByIdAndUpdate(
    meetingId,
    {
      $push: {
        attendees: {
          userId: attendeeId,
          email: attendeeEmail,
        },
      },
    },
    {
      returnOriginal: false,
      runValidators: true,
    }
  );
  return result;
};
const removeAttendee = (id, attendeeId, attendeeEmail) => {
  const meetingId = mongoose.Types.ObjectId(id);
  return Meetings.findByIdAndUpdate(
    meetingId,
    {
      $pull: {
        attendees: {
          userId: attendeeId,
          email: attendeeEmail,
        },
      },
    },
    {
      returnOriginal: false,
      runValidators: true,
    }
  );
};

const getMeetingFromPast = (todaysDate, search, id) => {
  return Meetings.find({
    $and: [
      {
        "attendees.userId": id,
      },
      {
        date: {
          $lt: new Date(todaysDate),
        },
      },
      {
        description: {
          $regex: `.*${search}.*`,
        },
      },
    ],
  });
};
const getAllMeetings = (search, id) => {
  return Meetings.find({
    $and: [
      {
        "attendees.userId": id,
      },
      {
        description: {
          $regex: `.*${search}.*`,
        },
      },
    ],
  });
};
const getMeetingFromFuture = (todaysDate, search, id) => {
  return Meetings.find({
    $and: [
      {
        "attendees.userId": id,
      },
      {
        date: {
          $gt: new Date(todaysDate),
        },
      },
      {
        description: {
          $regex: `.*${search}.*`,
        },
      },
    ],
  });
};
const getMeetingForPresent = (todaysDate, search, id) => {
  console.log(todaysDate);
  return Meetings.find({
    $and: [
      {
        "attendees.userId": id,
      },
      {
        date: {
          $eq: new Date(todaysDate),
        },
      },
      {
        description: {
          $regex: `.*${search}.*`,
        },
      },
    ],
  });
};
module.exports = {
  postNewMeeting,
  addAttendee,
  removeAttendee,
  getMeetingBId,
  getMeetingFromPast,
  getMeetingFromFuture,
  getMeetingForPresent,
  getAllMeetings,
};
