require("dotenv/config");
const express = require("express");
var bodyParser = require("body-parser");
// connecting to database
const { connect } = require("./db/init");

// create an application object
const app = express();
//for request body data
app.use(express.json());
//routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/users.route"));
app.use("/api/teams", require("./routes/teams.route"));
app.use("/api/meetings", require("./routes/meetings.route"));
app.use(require("./middleware/errors").resourceNotFound);
app.use(require("./middleware/errors").errorHandler);
const PORT = process.env.PORT || 5001;
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    process.exit(1);
  });
