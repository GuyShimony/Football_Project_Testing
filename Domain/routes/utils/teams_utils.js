const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const coach_utils = require("./coach_utils");
const game_utils = require("./games_utils");
const league_utils = require("./league_utils");

/*
The method will query the sports api for the team's name and return the id
*/
async function getTeamIdByName(team_name){
  const team_data = await axios.get(`${api_domain}/teams/search/${team_name}`, {
    params: {
      api_token: process.env.api_token,
    },
  })

  return team_data.data.data[0].id;
}

/*
The method query the SportMonk API for part of the team's information.
Will return {team_name, logo_path}
*/
async function getPreviwTeamData(team_id) {
  const team_data = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      api_token: process.env.api_token,
    },
  })
  return {team_name: team_data.data.data.name, logo_path: team_data.data.data.logo_path};
}

/*
The method query the SportMonk API for the team's full detials and will return all the team information
as stated in the team page.
*/
async function getTeamsInfo(teams_ids_list) {
    let promises = [];
    teams_ids_list.map((id) =>
      promises.push(
        axios.get(`${api_domain}/teams/${id}`, {
          params: {
            api_token: process.env.api_token,
            include: "coach"
          },
        })
      )
    );
    let teams_info = await Promise.all(promises);
    return await extractRelevantTeamData(teams_info);
}

/*
The method will extract all the relavent data about the team as it is 
mentioned in the api
*/
async function extractRelevantTeamData(teams_info) {

    return await Promise.all(teams_info.map(async (team_info) => {
        let coach = coach_utils.extractCoachData(team_info.data.data.coach.data);
        let upcoming_games = await game_utils.getTeamUpcomingGames(team_info.data.data.id);
        let latest_games = await game_utils.getTeamLatestGames(team_info.data.data.id);
        const name = team_info.data.data.name;
        return {
        name: name,
        coach: coach,
        Latest_Games: latest_games,
        Upcoming_Games: upcoming_games
        };
    }));

}

/*
The method will query the API to see if the teams are part of the Superliga league.
*/
async function checkTeamLeagueByTeamId(team_id){

  const team_info = await axios.get(`${api_domain}/teams/${team_id}`, {
          params: {
            api_token: process.env.api_token,
            include: "league"
          },
        })
  return  league_utils.checkIfLeagueIsSuperLiga(team_info.data.data.league.data.id)
}



exports.getTeamsInfo = getTeamsInfo;
exports.getTeamIdByName = getTeamIdByName;
exports.getPreviwTeamData = getPreviwTeamData
exports.checkTeamLeagueByTeamId = checkTeamLeagueByTeamId
