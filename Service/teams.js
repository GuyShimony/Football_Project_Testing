var express = require("express");
var router = express.Router();
const players_utils = require("../Domain/players_utils");
const teams_utils = require("../Domain/teams_utils");


async function getTeamData(team_id){

    const team_players = await players_utils.getPlayersByTeam(
      team_id
    );
    const team_info = await teams_utils.getTeamsInfo(
      [team_id]
    );
    const past_games = team_info[0]['Latest_Games']
    const future_games = team_info[0]['Upcoming_Games']
    const name = team_info[0]['name']
    const team_coach = team_info[0]['coach']


    return {
      name: name,
      coach: team_coach,
      squad: team_players,
      past_games: past_games,
      upcoming_games: future_games
    }
}


router.get("/id/:teamId", async (req, res, next) => {
  try {
    const team_details = await getTeamData(req.params.teamId)

    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

router.get("/name/:teamname", async (req, res, next) => {
  try {
    const team_id = await teams_utils.getTeamIdByName(req.params.teamname)
    const team_details = await getTeamData(team_id)
    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

router.get("/search/:teamname", async (req, res, next) => {
  try {
    const team_id = await teams_utils.getTeamIdByName(req.params.teamname)
    const team_details = await teams_utils.getPreviewTeamData(team_id)
    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
