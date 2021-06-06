//#region global imports
const DButils = require("./Domain/DButils");
require("dotenv").config();
//#endregion
//#region express configures
var express = require("express");
var path = require("path");
const session = require("client-sessions");
var logger = require("morgan");
var cors = require("cors");

var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 24 * 60 * 60 * 1000, // expired after 20 sec
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration,
    cookie: {
      httpOnly: false,
    },
    //the session will be extended by activeDuration milliseconds
  })
);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

// middleware to serve all the needed static files under the dist directory - loaded from the index.html file
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("dist"));

app.get("/api", (req, res) => {
  console.log(__dirname)
  res.sendFile(__dirname + "/Domain/index.html");
});

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

const port = process.env.PORT || "3000";

const auth = require("./Service/auth");
const users = require("./Service/users");
const league = require("./Service/league");
const teams = require("./Service/teams");
const games = require("./Service/games");
const players = require("./Service/players");
//#endregion

//#region cookie middleware
app.use(function (req, res, next) {
  if (req.session && req.session.userid) {
    DButils.execQuery("SELECT userid FROM Users")
      .then((users) => {
        if (users.find((x) => x.userid === req.session.userid)) {
          req.userid = req.session.userid;
        }
        next();
      })
      .catch((error) => next());
  } else {
    next();
  }
});
//#endregion

// ----> For cheking that our server is alive
app.get("/alive", (req, res) => res.send("I'm alive"));

// Routings
app.use("/users", users);
app.use("/league", league);
app.use("/teams", teams);
app.use("/games", games);
app.use("/players", players);
app.use(auth);

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});



// TEST API 
// const league_utils = require("./routes/utils/league_utils");
// test = async (req, res, next) => {
//   try {
//     const league_details = await league_utils.getLeagueDetails();
//     console.log(league_details)
//   } catch (error) {
//     console.log(error)
//   }
// };

// // TEST SQL SERVER
// const sql = require("./routes/utils/DButils");
// test = async (req, res, next) => {
//   try {
//     // parameters exists
//     // valid parameters
//     // username exists
//     console.log("qeuring")
//     const users = await sql.execQuery(
//       "SELECT e.EmployeesId, e.Name, e.Location FROM dbo.Employees as e"
//     );
//     console.log(users)
//   } catch (error) {
//     console.log(error);
//   }
// };

// test()
// process.on("SIGINT", function () {
//   if (server) {
//     server.close(() => console.log("server closed"));
//   }
// });
