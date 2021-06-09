let common = require("../common.js");

let games_utils = require(common.path.join(__dirname, '../../',"Domain","games_utils.js"));
let users_utils = require(common.path.join(__dirname, '../../',"Domain","users_utils.js"));

describe('Intergration of Game Domain and Referees Domain', () => {
    let before_game;
    before(async () => {
        before_game = await users_utils.checkIfFreeHeadReferees( "2021-01-03", "19:00:00")
    })
    context('Add a game on a day with an existing game and check the effects on the referee', function() {
        it('before and after referees number should be different', async  function() {
          const test_data = 
          {
            game_date: "2021-01-03",
            game_time: "19:00:00",
            home_team: "Midtjylland",
            home_team_id: 939,
            away_team: "Horsens",
            away_team_id: 211,
            stadium: "MCH Arena",
            headreferee: {user_id: 4, name:"William Collum"},
            linereferee1: {user_id: 3, name:"Daiyrbek Abdyldayev"},
            linereferee2: {user_id: 5, name:"Zainiddin Alimov"},
            boxreferee1: {user_id:6, name:"Bobby Madden"},
            boxreferee2: {user_id: 2, name:"Denis Shalayev"}
          } 
          await games_utils.addFutureGame(
            test_data.game_date,
            test_data.game_time,
            test_data.home_team,
            test_data.home_team_id,
            test_data.away_team,
            test_data.away_team_id,
            test_data.stadium,
            test_data.headreferee,
            test_data.linereferee1,
            test_data.linereferee2,
            test_data.boxreferee1,
            test_data.boxreferee2
            )
            // Check if the referees number had changed
          const after_add = await users_utils.checkIfFreeHeadReferees( "2021-01-03", "19:00:00")
          common.expect(before_game.length).to.not.equal(after_add.length)
        })
      })

      after(async () => {
        console.log("Deleting the game that was added in the test")  
        await common.DButils.execQuery(`DELETE FROM Games Where GameDateTime = '2021-01-03 19:00:00' AND HomeTeamID = 939 AND AwayTeamID = 211`)})
})


describe('Intergration of Game Domain and Referees Domain', () => {

    context('Add a new referee to the referees table and then add him to a new game', function() {
        it(`should return 1 free all scheduled games and the referee
         for the new game should be the new referee`, async  function() {

          const test_data = 
          {
            game_date: "2021-01-04",
            game_time: "19:00:00",
            home_team: "Midtjylland",
            home_team_id: 939,
            away_team: "Horsens",
            away_team_id: 211,
            stadium: "MCH Arena",
            headreferee: {user_id: 4, name:"William Collum"},
            linereferee1: {user_id: 3, name:"Daiyrbek Abdyldayev"},
            linereferee2: {user_id: 5, name:"Zainiddin Alimov"},
            boxreferee1: {user_id:10, name:"New User", role:"Box"},
            boxreferee2: {user_id: 2, name:"Denis Shalayev"}
          } 
          await users_utils.addReferee(
              test_data.boxreferee1.user_id, 
              test_data.boxreferee1.name,
              test_data.boxreferee1.role
            )
            // Before adding the newly game the date should now have 1 box referee avaliable
            const result_before = await users_utils.checkIfFreeBoxReferees(test_data.game_date, test_data.game_time)
            
          await games_utils.addFutureGame(
            test_data.game_date,
            test_data.game_time,
            test_data.home_team,
            test_data.home_team_id,
            test_data.away_team,
            test_data.away_team_id,
            test_data.stadium,
            test_data.headreferee,
            test_data.linereferee1,
            test_data.linereferee2,
            test_data.boxreferee1,
            test_data.boxreferee2
            )
            // Check if the referees was added to the game
          const game = await common.DButils.execQuery(`SELECT * FROM Games Where
           GameDateTime = '${test_data.game_date} ${test_data.game_time}'
           AND HomeTeamID = ${test_data.home_team_id} AND AwayTeamID = ${test_data.away_team_id}`)
            common.expect(result_before.length).to.be.greaterThan(0)
            common.expect(game[0].BoxReferee1).to.be.equal(test_data.boxreferee1.name)
        })
      })

      after(async () => {
        console.log("Deleting the game that was added in the test")  
        await common.DButils.execQuery(`DELETE FROM Games Where GameDateTime = '2021-01-04 19:00:00'
       AND HomeTeamID = 939 AND AwayTeamID = 211`)
       console.log("Deleting the fake referee")  
       await common.DButils.execQuery(`DELETE FROM Referees Where userid = 10`)
    })
       
})


