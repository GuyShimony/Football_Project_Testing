const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
// const TEAM_ID = "85";

/*
The method will query the sports api for the player's name and return the id
*/
async function getPlayerIdByName(player_name){
  const player_data = await axios.get(`${api_domain}/players/search/${player_name}`, {
    params: {
      api_token: process.env.api_token,
    },
  })
  let players_ids = []
  player_data.data.data.map(player => {
    if (player.fullname == player_name)
      players_ids.push(player.player_id)})
  return players_ids;
}

/*
The method will query the sports api for the all the players of a team by using include: squad
*/
async function getPlayerIdsByTeam(team_id) {
  let player_ids_list = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "squad",
      api_token: process.env.api_token,
    },
  });
  team.data.data.squad.data.map((player) =>
    player_ids_list.push(player.player_id)
  );
  return player_ids_list;
}

/*
The method will get all the players of a team using the Sport API.
Return: list of players objects
*/
async function getPlayersByTeam(team_id) {
  let player_ids_list = await getPlayerIdsByTeam(team_id);
  let players_info = await getPlayersInfo(player_ids_list);
  return players_info;
}


/*
The method will query the sports api for the player's info and the player's team's info.
Return: list of players objects
*/
async function getPlayersInfo(players_ids_list) {
  let promises = [];
  players_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/players/${id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team, position",
        },
      })
    )
  );
  let players_info = await Promise.all(promises);
  return extractFullPlayerData(players_info);
}


/*
The method will get all the player info and extract only the relevant data that can be used in the player's personal page
Return: list of players objects
*/
function extractFullPlayerData(players_info) {
  return players_info.map((player_info) => {
    const { fullname, image_path, position_id, common_name, nationality,
      birthdate, birthcountry, height, weight} = player_info.data.data;
    const { name, id } = player_info.data.data.team.data;
    return {
      name: fullname,
      image: image_path,
      position_id: position_id,
      position: player_info.data.data.position.data.name,
      team_name: name,
      team_id: id,
      nationality: nationality,
      birthdate: birthdate,
      birthcountry: birthcountry,
      common_name: common_name,
      weight: weight,
      height: height
    };
  });
}



exports.getPlayersByTeam = getPlayersByTeam;
exports.getPlayersInfo = getPlayersInfo;
exports.getPlayerIdByName = getPlayerIdByName;

