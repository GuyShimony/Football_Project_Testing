
function formatDateTime(dateObj){
    const date = dateObj.toISOString().split("T")[0];
    const time = `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
    return `${date} ${time}`
}

execQuery = async function (query) {
    await poolConnect;
    try {
      var result = await pool.request().query(query);
      return result.recordset;
    } catch (err) {
      console.error("SQL error", err);
      throw err;
    }
  };

async function isExistGame(game_date, home_team_id, away_team_id){
    const game_to_check = await execQuery(`SELECT * From Games WHERE GameDateTime == '${game_date}'
     AND HomeTeamID == '${home_team_id}' AND AwayTeamID == '${away_team_id}' ORDER BY GameDateTime `);
    // Update the datetime to be in the correct format - YY:MM:DD HH:MM:SS.nnnn
    game_to_check['GameDateTime'] = formatDateTime(game_to_check['GameDateTime'])
    return game_to_check.length > 0
  }