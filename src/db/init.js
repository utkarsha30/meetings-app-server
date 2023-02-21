const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("../models/users");
require("../models/meetings");
require("../models/teams");
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to db");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
    // throw error;
  }
};
module.exports = {
  connect,
};
