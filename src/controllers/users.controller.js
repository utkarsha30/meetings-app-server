const userService = require("../services/users.service");
const JWT = require("jsonwebtoken");
const registerNewUser = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: `Request body is missing, and needs to have the new workshop's details`,
    });
  }
  try {
    const newUser = await userService.registerNewUser(req.body);
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
const validateUser = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: `Request body is missing, `,
    });
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
          return res.status(400).json({
            status: "error",
            message: err.name,
          });
        }
        var userEmail = user.email;
        exports.userEmail = userEmail;
        res.json({
          id: user._id,
          name: user.name,
          email: user.email,
          token,
        });
      }
    );
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  registerNewUser,
  getAllUsers,
  validateUser,
};
