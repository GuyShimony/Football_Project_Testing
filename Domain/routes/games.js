var express = require("express");
var router = express.Router();
const games_utils = require("./utils/games_utils");
const season_utils = require("./utils/season_utils");
const teams_utils = require("./utils/teams_utils");
const DButils = require("./utils/DButils");



router.get("/currentStageGames", async (req, res, next) => {
    try {
      const past_games = await games_utils.getAllPastGames();
      const future_games = await games_utils.getAllUpcomingGames();
      const result = {
        latest: past_games,
        upcoming: future_games
      }
      res.send(result);
    } catch (error) {
      next(error);
    }
  });


  /**
 * Check if the user is a league representive by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.userid) {
    console.log("Checking if the user is a league representive")

    try{
      const users = await DButils.execQuery("SELECT userid FROM LeagueRepsUsers")
      if (users.find((x) => x.userid === req.session.userid)) {
        console.log("The user is a leagure representive")
        next();
      }
      else 
        res.status(401).send("Privilege Error: The following action is only permitted to league representives");


  } catch (error) {
      next(error);}
    }
  else
    res.status(401).send("Privilege Error: The following action is only permitted to league representives Or you have not Logged in first")
});

router.get("/all", async (req, res, next) => {
  try {
    const result = await games_utils.getAllGames()
    res.send(result);
  } catch (error) {
    next(error);
  }  
});

router.post("/addGame", async (req, res, next) => {
    try {

      const game_date = req.body.game_date;
      const game_time = req.body.game_time
      const home_team = req.body.home_team
      const home_team_id = req.body.home_team_id
      const away_team = req.body.away_team
      const away_team_id = req.body.away_team_id
      const stadium = req.body.stadium
      
      // If the user only gave the team names without the id
      if (home_team_id == undefined || away_team_id == undefined){
        let ids = await Promise.all([teams_utils.getTeamIdByName(home_team_id), teams_utils.getTeamIdByName(away_team_id)])
        home_team_id = ids[0]
        away_team_id = ids[1]
      }

      // Check if the game's date match the current season. If not send an error to the user
      if (!await season_utils.checkDateMatchCurrentSeason(new Date(game_date)))
        throw { status: 406, message: "Bad game input. Please check the date or teams" };

      // Check if the game's match the Superliga's teams. If not send an error to the user
      const leagues_checks = await Promise.all([teams_utils.checkTeamLeagueByTeamId(home_team_id), teams_utils.checkTeamLeagueByTeamId(away_team_id)])
      if (!leagues_checks[0] || !leagues_checks[1])
        throw { status: 406, message: "Bad game input. Please check the date or teams" };
      // Check if the game's date already exists. If not send an error to the user
      else if (await games_utils.checkIfMathcExists(`${game_date} ${game_time}`, home_team_id, away_team_id))
        throw { status: 405, message: "The teams already have a match in that date & time" };

      await games_utils.addFutureGame(game_date,game_time,home_team,home_team_id,away_team,
        away_team_id,stadium)

      res.status(201).send("The game was successfully added");
      } catch (error) {
      next(error);
    }
  });
  

  router.put("/addScore", async (req, res, next) => {
    try {

      const game_id =  req.body.game_id
      const game_score = req.body.score;
      games_utils.addScoreToGame(game_id, game_score);
      res.status(201).send("The game was updated");
      } catch (error) {
      next(error);
    }
  });

  router.post("/addEvent", async (req, res, next) => {
    try {

      const game_id =  req.body.game_id
      const eventlog = req.body.eventlog;
      let promises = eventlog.map(async event => games_utils.addEventToGame(game_id, event))
      await Promise.all(promises)
      res.status(201).send("The game was updated");
      } catch (error) {
      next(error);
    }
  });

  module.exports = router;