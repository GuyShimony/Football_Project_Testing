const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const app_utils = require("./app_utils");
const DButils = require("./DButils");
const teams_utils = require("./teams_utils");

/*
The method will query the games DB for the next scheduled game
*/
async function getNextGame(){
  const now = app_utils.formatDateTime(new Date())
  const next_games = await DButils.execQuery(`SELECT * From Games WHERE GameDateTime >  '${now}' ORDER BY GameDateTime`)
  const next_game = next_games[0]
  // Update the datetime to be in the correct format - YY:MM:DD HH:MM:SS.nnnn
  next_game['GameDateTime'] = app_utils.formatDateTime(next_game['GameDateTime'])
  return next_game;
}

/*
The method will query the games DB for the team's past games (If there are some).
*/
async function getTeamLatestGames(team_id){
  let games = []
  const now = app_utils.formatDateTime(new Date())
  const latest_games = await DButils.execQuery(`SELECT * From Games WHERE (AwayTeamID = '${team_id}' OR
  HomeTeamID = '${team_id}') AND GameDateTime <  '${now}' ORDER BY GameDateTime`)
  latest_games.map((game) =>{
      // Update the datetime to be in the correct format - YY:MM:DD HH:MM:SS.nnnn
      game['GameDateTime'] = app_utils.formatDateTime(game['GameDateTime'])
      games.push(game)
  });
  return games
}

/*
The method will query the games DB for the team's upcoming  games (If there are some).
*/
async function getTeamUpcomingGames(team_id){
  let games = []
  const now = app_utils.formatDateTime(new Date())
  const upcoming_games = await DButils.execQuery(`SELECT * From Games WHERE (AwayTeamID = ${team_id} OR
  HomeTeamID = ${team_id}) AND GameDateTime >  '${now}' ORDER BY GameDateTime`);
  upcoming_games.map((game) =>{
      // Update the datetime to be in the correct format - YY:MM:DD HH:MM:SS.nnnn
      game['GameDateTime'] = app_utils.formatDateTime(game['GameDateTime'])
      games.push(game)
  });
  return games
}

/*
The method will return all teams that dont playes in this date and time.
*/
async function checkIfTeamHaveGame(teams,game_date,game_time,team_name=null){
  const upcoming_teams = await DButils.execQuery(`SELECT AwayTeamID,HomeTeamID From Games WHERE GameDateTime >= DATEADD(HOUR,-2,'${game_date} ${game_time}') AND GameDateTime<=DATEADD(HOUR,2,'${game_date} ${game_time}')`);
  let teams_after_filter=[];
  if (teams!=null) (
    teams.map((team) =>{
      if(team.name!=team_name && (upcoming_teams==null || !(upcoming_teams.find((x) => x.AwayTeamID === team.id || x.HomeTeamID === team.id)))){
        teams_after_filter.push(team);
      }
    })
  )
  return teams_after_filter;
}
/*
  The method will query the games DB all the games that were already played with regard to now
*/
async function getAllPastGames(){
  const now = app_utils.formatDateTime(new Date())
  const past_games = await DButils.execQuery(`SELECT Games.gameid, Games.GameDateTime, Games.HomeTeam, Games.AwayTeam, 
  Games.Stadium, Games.Result, Games.Referee
  FROM Games WHERE GameDateTime <'${now}' ORDER BY GameDateTime `);

  return Promise.all(past_games.map(async (game) => {
    // Update the datetime to be in the correct format - YY:MM:DD HH:MM:SS.nnnn
    game['GameDateTime'] = app_utils.formatDateTime(game['GameDateTime'])

    // Get all the events assign to the game
    let events_ids = await DButils.execQuery(`SELECT eventid FROM GamesEvents WHERE gameid = ${game.gameid}`)
    // Build the list of events ids for the where clause -> (1,2,3,...)
    let query_ids = "("
    events_ids.map(event => query_ids += `${event.eventid},`)
    query_ids = query_ids.replace(/,\s*$/, ")");

    // Assign the event log for each game. The same as joining the two tables (Games and GamesEvents)
    let events = await DButils.execQuery(`SELECT Events.EventDate, Events.EventTime,
    Events.EventGameTime, Events.Event From Events 
     WHERE eventid IN ${query_ids}`)
     Object.assign(game, {event_log: events});
     return game
  }));
}

/*
  The method will query the games DB all the games that are not yet played with regard to now
*/
async function getAllUpcomingGames(){
  const games = []
  const now = app_utils.formatDateTime(new Date())
  const future_games = await DButils.execQuery(`SELECT Games.gameid, Games.GameDateTime, Games.HomeTeam, Games.AwayTeam, 
  Games.Stadium, Games.Referee From Games WHERE GameDateTime >'${now}' ORDER BY GameDateTime `);
  future_games.map((game) =>{
      // Update the datetime to be in the correct format - YY:MM:DD HH:MM:SS.nnnn
      game['GameDateTime'] = app_utils.formatDateTime(game['GameDateTime'])
      games.push(game)
  });
  return games
}

/*
  The method try to delete all games that are past games from the users favorite games.
  Meaning the user can only have future games as his favorite games.
*/
async function removePastGames(){
  const past_games = await getAllPastGames();
  past_games.map(async (game) =>{
    await DButils.execQuery(`DELETE From UsersFavoriteGames WHERE 
    gameid = '${game.gameid}'`);
  });
}

/*
  The method will query the DB for all the games that are mentioned in the game_ids param.
  The games are returned with the date formated
*/
async function getGamesInfo(game_ids){
  let promises = []
  let fav_games = []
  game_ids.map((gameid) =>  
    promises.push(DButils.execQuery(`SELECT * From Games WHERE gameid = ${gameid}`)))
  fav_games= await Promise.all(promises)

  return fav_games.map((game) => {
    // Update the datetime to be in the correct format - YY:MM:DD HH:MM:SS.nnnn
    game[0]['GameDateTime'] = app_utils.formatDateTime(game[0]['GameDateTime'])
    return game[0]
  })
}

/*
The method will get all the data of a game and will add it to the games DB
The Game should be a future game
*/
async function addFutureGame(game_date,game_time, HomeTeam, HomeTeamID,AwayTeam,
  AwayTeamID,stadium){
    await DButils.execQuery(`INSERT INTO Games
    ([GameDateTime],[HomeTeam],[HomeTeamID],[AwayTeam],
      [AwayTeamID], [Stadium])
    VALUES ('${game_date} ${game_time}', '${HomeTeam}',${HomeTeamID},'${AwayTeam}',${AwayTeamID}
    ,'${stadium}')`);
}

/*
The method will get a score and a game_id and will update the game with the relevent score.
The game should be a past game. The validtion is implemented in the client side.
*/
async function addScoreToGame(game_id,score){
  await DButils.execQuery(`Update Games SET Result = '${score}' WHERE gameid = ${game_id}`);
}

/*
The method will get an event and a game_id and will update the game with the given event.
The game should be a past game. The validtion is implemented in the client side.
If the event exist it will be updated with the new value
*/
async function addEventToGame(game_id,event){
    let events_ids = await DButils.execQuery(`SELECT GamesEvents.gameid, Events.eventid FROM Events JOIN GamesEvents ON Events.eventid = GamesEvents.eventid
    WHERE GamesEvents.gameid = ${game_id} AND Events.EventDate = '${event.event_date}'
    AND Events.EventTime = '${event.event_time}' 
    AND Events.EventGameTime =  ${event.event_game_time}`)
      /*
        Check if the event already exist. Event is represented by Eventid.
        If Yes -> Update it
        Else -> Create a new event
      */
    if (events_ids.length > 0) 
      await DButils.execQuery(`Update Events SET Event = '${event.event}' WHERE eventid = ${events_ids[0].eventid}`);
    else{
      await DButils.execQuery(`INSERT INTO Events 
          ([EventDate], [EventTime], [EventGameTime], [Event]) 
          Values ('${event.event_date}', '${event.event_time}',
          ${event.event_game_time},'${event.event}')`)
      // Update the new event in the GamesEvents relationship table.
      // The following command return the last isnerted item to a table
      const last_event = await DButils.execQuery(`SELECT eventid FROM Events
       WHERE EventDate = '${event.event_date}' AND EventTime = '${event.event_time}' AND EventGameTime =  ${event.event_game_time}`)
      DButils.execQuery(`INSERT INTO GamesEvents ([gameid], [eventid]) VALUES (${game_id}, ${last_event[0].eventid})`)
    }
}

/*
The method will query the DB to see if the teams have a game in the datetime that was given
*/
async function checkIfMathcExists(game_time,home_team_id, away_team_id){
  let result = await DButils.execQuery(`SELECT gameid FROM Games Where GameDateTime = '${game_time}' AND
  ((HomeTeamID = ${home_team_id} AND AwayTeamID = ${away_team_id}) OR
  (HomeTeamID = ${away_team_id} AND AwayTeamID = ${home_team_id}))`)
  if(result.length > 0)
    return true

  return false
}

/*
The method will query the DB for all the games
*/
async function getAllGames(){
  return await DButils.execQuery("SELECT * FROM Games");
}


/* !!!!!!!!!!!!!!
ADDDED METHOD FOR REGRESSION TEST FOR USE CASE -> 
This method will not be fully implemented in order to check that the system does not crash
*/ 
async function deleteGame(game_time){
  try{
    let gameid_to_delete = await DButils.execQuery(`SELECT gameid FROM Games Where GameDateTime = '${game_time}'`)
    await DButils.execQuery(`DELETE FROM Games Where gameid = '${gameid_to_delete[0]["gameid"]}'`)
    let eventids_to_delete = await DButils.execQuery(`SELECT eventid FROM GamesEvents Where gameid = '${gameid_to_delete[0]["gameid"]}'`)
    await DButils.execQuery(`DELETE FROM GamesEvents Where gameid = '${gameid_to_delete[0]["gameid"]}'`)
    //MISSING CORRESPONDING EVENTS DELETION
    // eventids_to_delete.map(async (eventid) =>{
    //   await DButils.execQuery(`DELETE From Events WHERE 
    //   eventid = '${eventid}'`);
    // });
    return true
  }
  catch(error){
    return false
  }
}


exports.getAllGames = getAllGames;
exports.getTeamLatestGames = getTeamLatestGames;
exports.getTeamUpcomingGames = getTeamUpcomingGames;
exports.getNextGame = getNextGame;
exports.removePastGames = removePastGames;
exports.getGamesInfo = getGamesInfo;
exports.getAllPastGames = getAllPastGames;
exports.getAllUpcomingGames = getAllUpcomingGames;
exports.addFutureGame = addFutureGame;
exports.addScoreToGame = addScoreToGame
exports.addEventToGame = addEventToGame
exports.checkIfMathcExists = checkIfMathcExists
exports.checkIfTeamHaveGame = checkIfTeamHaveGame;
exports.deleteGame = deleteGame
