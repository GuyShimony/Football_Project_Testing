let common = require("../common.js");

let games_utils = require(common.path.join(__dirname, '../../',"Domain","games_utils.js"));


/*
The module will have all the integrations tests of the game Domain.
Integration tests are mixutre of functions from the game utils domain that will 
work together. By doing that we will test the integration of those functions
*/

describe('/POST addGame() + getallupcoming()', () => {
    let old_upcoming_games;
    before(async()=>{
      old_upcoming_games = await games_utils.getAllUpcomingGames()
    })

    it('should return 201',  function(done) {    
      var agent = common.chai.request.agent(`${api_domain}`)
     
      agent.post('/login')
        .send({username: "johnc", password: "1234John"})
        .then((res, err) => {
          
         agent.post('/games/addGame')
          .send({
            game_date: "2021-09-09",
            game_time: "20:00:00",
            home_team: "København",
            home_team_id: 85,
            away_team: "Silkeborg",
            away_team_id: 86,
            stadium: "MCH Arena",
            head_referee: {user_id: 7, name:"Nick Walsh", role:"Head"},
            line_referee1: {user_id: 3, name:"Daiyrbek Abdyldayev", role:"Line"},
            line_referee2: {user_id: 5, name:"Zainiddin Alimov", role:"Line"},
            box_referee1: {user_id:6, name:"Bobby Madden", role:"Box"},
            box_referee2: {user_id: 2, name:"Denis Shalayev", role:"Box"}
          })
          .then((res, err) => {
           games_utils.getAllUpcomingGames().then(
             res => {
               common.expect(res.length).to.be.equal(old_upcoming_games.length+1)
                done()})

        })
      })

      })
      after(async function () {
        console.log("Clear the game from the DB");
        await common.DButils.execQuery(`DELETE FROM Games WHERE GameDateTime = '2021-09-09 20:00:00' 
        AND HomeTeamID = 85 AND AwayTeamID = 86`);
    });
    })

describe('/POST addGame() + checkifmatchexists()', () => {

    it('should return true',  function(done) {    
      var agent = common.chai.request.agent(`${api_domain}`)
     const test_data =
      {
        game_date: "2021-11-11",
        game_time: "21:00:00",
        home_team: "Brøndby",
        home_team_id: 293,
        away_team: "Viborg",
        away_team_id: 2447,
        stadium: "Santiago Bernabeu",
        head_referee: {user_id: 7, name:"Nick Walsh", role:"Head"},
        line_referee1: {user_id: 3, name:"Daiyrbek Abdyldayev", role:"Line"},
        line_referee2: {user_id: 5, name:"Zainiddin Alimov", role:"Line"},
        box_referee1: {user_id:6, name:"Bobby Madden", role:"Box"},
        box_referee2: {user_id: 2, name:"Denis Shalayev", role:"Box"}
      }
      agent.post('/login')
        .send({username: "johnc", password: "1234John"})
        .then((res, err) => {
         agent.post('/games/addGame')
          .send({
            game_date: test_data.game_date,
            game_time: test_data.game_time,
            home_team: test_data.home_team,
            home_team_id: test_data.home_team_id,
            away_team: test_data.away_team,
            away_team_id: test_data.away_team_id,
            stadium: test_data.stadium,
            head_referee: test_data.head_referee,
            line_referee1: test_data.line_referee1,
            line_referee2: test_data.line_referee2,
            box_referee1: test_data.box_referee1,
            box_referee2: test_data.box_referee2
          })
          .then((res, err) => {
           games_utils.checkIfMathcExists(test_data.game_date+ ' '+test_data.game_time,
           test_data.home_team_id,test_data.away_team_id).then(
             res => {
               common.expect(res).to.equal(true)
                done()})
        })
      })

      })
      after(async function () {
        console.log("Clear the game from the DB");
        await common.DButils.execQuery(`DELETE FROM Games WHERE GameDateTime = '2021-11-11 21:00:00' 
        AND HomeTeamID = 293 AND AwayTeamID = 2447`);
    });
    })


    describe('/POST getallpastgames() + changescore() + getGamesInfo()', () => {
      let game_to_change;
      it('score should be updated',  async function() {    
        let past_games = await games_utils.getAllPastGames();
        game_to_change = past_games[0];
        await games_utils.addScoreToGame(game_to_change['gameid'],'2-2');
        let game_info = await games_utils.getGamesInfo([game_to_change['gameid']]);
        common.expect(game_info[0]['Result']).to.equal("2-2");  
        })

          after(async function () {
          console.log("Change the result back to its original in the DB");
          await common.DButils.execQuery(`UPDATE Games SET Result = '0-3' WHERE gameid= ${game_to_change['gameid']}`);
          });
        })
