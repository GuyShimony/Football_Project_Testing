var express = require("express");
var router = express.Router();
const DButils = require("../Domain/DButils");
const users_utils = require("../Domain/users_utils");
const players_utils = require("../Domain/players_utils");
const teams_utils = require("../Domain/teams_utils.js");
const games_utils = require("../Domain/games_utils.js");


/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.userid) {
    DButils.execQuery("SELECT userid FROM Users")
      .then((users) => {
        if (users.find((x) => x.userid === req.session.userid)) {
          req.userid = req.session.userid;
          next();
        }
      })
      .catch((err) => next(err));
  } else {
    res.sendStatus(401);
  }
});

/**
 * This path gets body with playerId and save this player in the favorites list of the logged-in user
 */
router.post("/addFavoritePlayers", async (req, res, next) => {
  try {
    const user_id = req.session.userid;
    const player_id = req.body.player_id;
    await users_utils.markPlayerAsFavorite(user_id, player_id);
    res.status(201).send("The player successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});

/**
 * This path gets body with teamId and save this team in the favorites list of the logged-in user
 */
 router.post("/addFavoriteTeams", async (req, res, next) => {
  try {
    const user_id = req.session.userid;
    const team_id = req.body.team_id;
    await users_utils.markTeamAsFavorite(user_id, team_id);
    res.status(201).send("The team successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});

/**
 * This path gets body with game data and save this game in the favorites list of the logged-in user
 */
 router.post("/addFavoriteGames", async (req, res, next) => {
  try {
    const user_id = req.session.userid;
    const game_id = req.body.game_id;
    if(users_utils.isGameInFuture(game_id)){
      await users_utils.markGameAsFavorite(user_id, game_id);
      res.status(201).send("The game successfully saved as favorite");}
    else
      res.status(403).send("Can only add future games to favorite games list");

  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites players that were saved by the logged-in user
 */
router.get("/favoritePlayers", async (req, res, next) => {
  try {
    const userid = req.session.userid;
    const player_ids = await users_utils.getFavoritePlayers(userid);
    let player_ids_array = [];
    player_ids.map((element) => player_ids_array.push(element.playerid)); //extracting the players ids into array
    const results = await players_utils.getPlayersInfo(player_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites teams that were saved by the logged-in user
 */
 router.get("/favoriteTeams", async (req, res, next) => {
  try {
    const userid = req.session.userid;
    const teams_ids = await users_utils.getFavoriteTeams(userid);
    let teams_ids_array = [];
    teams_ids.map((element) => teams_ids_array.push(element.teamid)); //extracting the players ids into array
    const results = await teams_utils.getTeamsInfo(teams_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites games that were saved by the logged-in user
 */
router.get("/favoriteGames", async (req, res, next) => {
  try {
    const userid = req.session.userid;
    //delete user's marked past games
    await games_utils.removePastGames();
    const game_ids = await users_utils.getFavoriteGames(userid);
    let games_ids_array = [];
    game_ids.map((element) => games_ids_array.push(element.gameid)); 
    const results = await games_utils.getGamesInfo(games_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
