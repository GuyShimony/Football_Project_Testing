const DButils = require("./DButils");

/*
Add the favorite players to the users DB
*/
async function markPlayerAsFavorite(user_id, player_id) {
  await DButils.execQuery(
    `insert into UsersFavoritePlayers values ('${user_id}',${player_id})`
  );
}

/*
Add the favorite teams to the users DB
*/
async function markTeamAsFavorite(user_id, team_id) {
  await DButils.execQuery(
    `insert into UsersFavoriteTeams values ('${user_id}',${team_id})`
  );
}

/*
Add the favorite games to the users DB
*/
async function markGameAsFavorite(user_id, game_id) {
  await DButils.execQuery(
    `insert into UsersFavoriteGames values ('${user_id}','${game_id}')`
  );
}

/*
Get the favorite players from the users DB
*/
async function getFavoritePlayers(user_id) {
  const player_ids = await DButils.execQuery(
    `select playerid from UsersFavoritePlayers where userid='${user_id}'`
  );
  return player_ids;
}

/*
Get the favorite games from the users DB
*/
async function getFavoriteGames(user_id) {
  const games = await DButils.execQuery(
    `select * from UsersFavoriteGames where userid='${user_id}'`
  );
  return games;
}


/*
Get the favorite teams from the users DB
*/
async function getFavoriteTeams(user_id) {
  const player_ids = await DButils.execQuery(
    `select teamid from UsersFavoriteTeams where userid='${user_id}'`
  );
  return player_ids;
}


/*
Returns True if the game is not yet played (future game) and False otherwise (past games)
*/
async function isGameInFuture(game_id) {
  const now = app_utils.formatDateTime(new Date())
  const game_date = await DButils.execQuery(
    `select GameDateTime from Games where gameid='${game_id}'`);
  game_date = app_utils.formatDateTime(game_date)
  if(game_date>now)
    return true
  return false
}

/*
The method will return all head referee that dont playes in this date and time.
*/
async function checkIfFreeHeadReferees(game_date,game_time){
  const referees = await DButils.execQuery(`SELECT * From Referees WHERE RefereeType='Head' AND userid NOT IN (SELECT HeadRefereeId From Games WHERE GameDateTime >= DATEADD(HOUR,-2,'${game_date} ${game_time}') AND GameDateTime<=DATEADD(HOUR,2,'${game_date} ${game_time}'))`);
  return referees;
}

/*
The method will return all line referee that dont playes in this date and time.
*/
async function checkIfFreeLineReferees(game_date,game_time){
  const referees = await DButils.execQuery(`SELECT * From Referees WHERE RefereeType='Line' AND userid NOT IN (SELECT LineRefereeId1 From Games WHERE GameDateTime >= DATEADD(HOUR,-2,'${game_date} ${game_time}') AND GameDateTime<=DATEADD(HOUR,2,'${game_date} ${game_time}')) AND userid NOT IN (SELECT LineRefereeId2 From Games WHERE GameDateTime >= DATEADD(HOUR,-2,'${game_date} ${game_time}') AND GameDateTime<=DATEADD(HOUR,2,'${game_date} ${game_time}'))`);
  return referees;
}

/*
The method will return all box referee that dont playes in this date and time.
*/
async function checkIfFreeBoxReferees(game_date,game_time){
  const referees = await DButils.execQuery(`SELECT * From Referees WHERE RefereeType='Box' AND userid NOT IN (SELECT BoxRefereeId1 From Games WHERE GameDateTime >= DATEADD(HOUR,-2,'${game_date} ${game_time}') AND GameDateTime<=DATEADD(HOUR,2,'${game_date} ${game_time}')) AND userid NOT IN (SELECT BoxRefereeId2 From Games WHERE GameDateTime >= DATEADD(HOUR,-2,'${game_date} ${game_time}') AND GameDateTime<=DATEADD(HOUR,2,'${game_date} ${game_time}'))`);
  return referees;
}

exports.markPlayerAsFavorite = markPlayerAsFavorite;
exports.markTeamAsFavorite = markTeamAsFavorite;
exports.markGameAsFavorite = markGameAsFavorite;

exports.getFavoritePlayers = getFavoritePlayers;
exports.getFavoriteTeams = getFavoriteTeams;
exports.getFavoriteGames = getFavoriteGames;
exports.isGameInFuture = isGameInFuture;
exports.checkIfFreeHeadReferees = checkIfFreeHeadReferees;
exports.checkIfFreeLineReferees = checkIfFreeLineReferees;
exports.checkIfFreeBoxReferees = checkIfFreeBoxReferees;