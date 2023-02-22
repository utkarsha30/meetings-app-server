const userService = require("../services/users.service");
const JWT = require("jsonwebtoken");
const { Errors } = require("../constants");
const registerNewUser = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to to register new user`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const newUser = await userService.registerNewUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    return next(error);
  }
};
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    return next(error);
  }
};
const validateUser = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have login details`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const user = await userService.validateUser(req.body);
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: `Invalid credentials, `,
      });
    }
    //generate JWT
    const claims = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    JWT.sign(
      claims,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          err.name = Errors.InternalServerError;
          return next(err);
        }
        res.json({
          id: user._id,
          name: user.name,
          email: user.email,
          token,
        });
      }
    );
  } catch (error) {
    const err = new Error("Something went wrong during login");
    err.name = Errors.InternalServerError;
    return next(err);
  }
};

module.exports = {
  registerNewUser,
  getAllUsers,
  validateUser,
};
