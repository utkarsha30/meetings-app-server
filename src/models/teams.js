const mongoose = require("mongoose");

const teamsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  members: [
    {
      userId: String,
      email: String,
      //to stop creating id for subdocuments
      _id: false,
    },
  ],
});

mongoose.model("Teams", teamsSchema);
