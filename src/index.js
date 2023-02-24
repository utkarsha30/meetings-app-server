require("dotenv/config");
//--------------
const history = require("connect-history-api-fallback");
const express = require("express");
const cors = require("cors");
// connecting to database
const { connect } = require("./db/init");

// create an application object
const app = express();
//to avoid cors policy error
app.use(cors({ origin: "*" }));
//for request body data
app.use(express.json());
//----------------
app.use(history());
//----------------
app.use(express.static("src"));
//--------------
app.get("/", (req, res) => {
  res.sendFile("src/index.html");
});
// app.get("/", (req, res) => {
//   res.send(
//     '<div style="width:200px; margin: auto auto;"><img width="100%"  src="https://media.tenor.com/2jd3xi2WVt0AAAAC/recurring-settings.gif"></div><div style="width:220px; margin: 0 auto;"><h2>Server is Running...</h2></div>'
//   );
// });
//routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/users.route"));
app.use("/api/teams", require("./routes/teams.route"));
app.use("/api/meetings", require("./routes/meetings.route"));
app.use("/api/calendar", require("./routes/calendar.route"));
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
