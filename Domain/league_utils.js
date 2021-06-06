const axios = require("axios");
const game_utils = require("./games_utils");
const LEAGUE_ID = 271;

/*
The method will get the next game scheduled for the current stage.
The next game will be the one closest to now (in the future)
Return: Object with all the game columns info
*/
async function getLeagueDetails() {
  
  const league = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/leagues/${LEAGUE_ID}`,
    {
      params: {
        include: "season",
        api_token: process.env.api_token,
      },
    }
  );

  if (league.data.data.current_stage_id != null && league.data.data.season != null){
    const stage = await axios.get(
      `https://soccer.sportmonks.com/api/v2.0/stages/${league.data.data.current_stage_id}`,
      {
        params: {
          api_token: process.env.api_token,
        },
      }
    );  

    const next_game = await game_utils.getNextGame();
  
    return {
      league_name: league.data.data.name,
      current_season_name: league.data.data.season.data.name,
      current_stage_name: stage.data.data.name,
      stage_next_game: next_game
    };
  }
  else{
    // There is not stage that is corrently running by the league, meaning the season is over.
    return {
      league_name: league.data.data.name,
      current_season_name: null,
      current_stage_name: null,
      stage_next_game: null
    }
  }
}




function checkIfLeagueIsSuperLiga(league_id){
  return league_id == LEAGUE_ID
}
exports.LEAGUE_ID = LEAGUE_ID
exports.getLeagueDetails = getLeagueDetails;
exports.checkIfLeagueIsSuperLiga = checkIfLeagueIsSuperLiga
