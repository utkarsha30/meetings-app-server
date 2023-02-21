const jwt = require("jsonwebtoken");
const { Errors } = require("../constants");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  const { JWT_SECRET } = process.env;

  jwt.verify(token, JWT_SECRET, (err, claims) => {
    if (err) {
      err.name = Errors.Unauthorized;
      return next(err);
    }
    // add the claims to req / res.locals
    res.locals.claims = claims;
    next();
  });
};

module.exports = {
  authenticate,
};
