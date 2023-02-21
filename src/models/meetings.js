const mongoose = require("mongoose");
const meetingsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    hours: Number,
    minutes: Number,
  },
  endTime: {
    hours: Number,
    minutes: Number,
  },
  attendees: [
    {
      userId: String,
      email: String,
    },
  ],
});

mongoose.model("Meetings", meetingsSchema);
