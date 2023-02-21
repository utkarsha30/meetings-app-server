const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const registerNewUser = (details) => {
  return Users.create(details);
};
const getAllUsers = () => {
  return Users.find(
    {},
    {
      password: 0,
    }
  );
};
const getUserById = (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return Users.findById(_id);
};
const validateUser = async (loginCredentials) => {
  const user = await Users.findOne({
    email: loginCredentials.email,
  });
  if (!user) {
    return null;
  }
  if (user.password === loginCredentials.password) {
    return user;
  } else {
    return null;
  }
};
module.exports = {
  registerNewUser,
  getAllUsers,
  validateUser,
  getUserById,
};
