let common = require("../common.js");


let games_utils = require(common.path.join(__dirname, '../../',"Domain","games_utils.js"));
let app_utils = require(common.path.join(__dirname, '../../',"Domain","app_utils.js"));
let season_utils = require(common.path.join(__dirname, '../../',"Domain","season_utils.js"));

/*
Test game adding procedure with positive (OK) test and negative (Fail) tests.
All the functions in the auth module related to the game adding Use Case will be tested
*/

// describe('#getTeamIdByName()', function() {

//     context('with valid teams names', function() {
//       it('should return 86', async  function() {
//         const id = await teams_utils.getTeamIdByName("Silkeborg")
//         common.expect(id).to.equal(86)
//       })
//     })
    
//     context('with no arguments', function() {
//       it('should throw error', async  function(){
//         await teams_utils.getTeamIdByName("").catch( function(error){
//            // add an assertion to check the error
//          common.expect(function() { throw error })
//         .to.throw(Error);
//         })
//       })
//     })

//     context('with team name that does not exists', function() {
//       it('should throw error', async  function(){
//         await teams_utils.getTeamIdByName("aaaaaaa").catch( function(error){
//            // add an assertion to check the error
//          common.expect(function() { throw error })
//         .to.throw(Error);
//         })
//       })
//     })
//   })



// describe('#checkDateMatchCurrentSeason()', function() {

//   context('with valid date', function() {
//     it('should return true for year 2021', async  function() {
//       const result = await season_utils.checkDateMatchCurrentSeason(new Date("2021-05-04 09:00:00"))
//       common.expect(result).to.equal(true)
//     })
//   })

//   context('with invalid date', function() {
//     it('should return false for year 2019', async  function() {
//       const result = await season_utils.checkDateMatchCurrentSeason(new Date("2019-05-04 09:00:00"))
//       common.expect(result).to.equal(false)
//     })
//   })
    
//   })

// describe('#checkTeamLeagueByTeamId()', function() {
//   context('with Superliga team', function() {
//     it('should return true', async  function() {
//       const result = await teams_utils.checkTeamLeagueByTeamId(86)
//       common.expect(result).to.equal(true)
//     })
//   })
//   context('with team that does not belong to Superliga', function() {
//     it('should return false', async  function() {
//       const result = await teams_utils.checkTeamLeagueByTeamId(930)
//       common.expect(result).to.equal(false)
//     })
//   })
// })

// describe('#checkIfMathcExists()', function() {

//   context('with valid datetime that belongs to a real match', function() {
//     it('should return true', async  function() {
//       const result = await games_utils.checkIfMathcExists("2021-01-03 19:00:00", 939, 390 )
//       common.expect(result).to.equal(true)
//     })
//   })
//   context('with invalid datetime that does not belong to a real match', function() {
//     it('should return false', async  function() {
//       const result = await games_utils.checkIfMathcExists("2019-01-03 19:00:00", 939, 390)
//       common.expect(result).to.equal(false)
//     })
//   })

//   context('with no home team and away team', function() {
//     it('should throw error', async  function() {
//       await games_utils.checkIfMathcExists("2021-01-03 19:00:00")
//       .catch( function(error){
//               // add an assertion to check the error
//           common.expect(function() { throw error })
//           .to.throw(Error);
//       })
//     })
//   })
    
// })

// describe('#addFutureGame()', function() {

//   context('with valid data', function() {
//     it('should be added to the DB', async  function() {
//       const test_data =
//       {
//         game_date: "2022-01-01",
//         game_time: "19:00:00",
//         home_team: "Midtjylland",
//         home_team_id: 939,
//         away_team: "Horsens",
//         away_team_id: 211,
//         stadium: "MCH Arena",
//         referee: {
//           name: "Denis Shalayev"
//         }
//       } 
//       await games_utils.addFutureGame(
//         test_data.game_date,
//         test_data.game_time,
//         test_data.home_team,
//         test_data.home_team_id,
//         test_data.away_team,
//         test_data.away_team_id,
//         test_data.stadium
//         )
//       const result = await games_utils.checkIfMathcExists(
//         `${test_data.game_date} ${test_data.game_time}`,
//         test_data.home_team_id, test_data.away_team_id)
//       common.expect(result).to.equal(true)
//     })
//   })

//   context('with no date', function() {
//     it('should throw error', async  function() {
//       const test_data =
//       {
//         game_date: "",
//         game_time: "19:00:00",
//         home_team: "Midtjylland",
//         home_team_id: 939,
//         away_team: "Horsens",
//         away_team_id: 211,
//         stadium: "MCH Arena",
//         referee: {
//           name: "Denis Shalayev"
//         }
//       } 
//       await games_utils.addFutureGame(
//         test_data.game_date,
//         test_data.game_time,
//         test_data.home_team_id,
//         test_data.home_team,
//         test_data.away_team_id,
//         test_data.away_team,
//         test_data.stadium
//         )
//         .catch( function(error){
//           // add an assertion to check the error
//         common.expect(function() { throw error })
//         .to.throw(Error)
//       })
//     })

    
//   after(async function () {
//       console.log("Clear the game from the DB");
//       await common.DButils.execQuery("DELETE FROM Games Where GameDateTime = '2022-01-01 19:00:00' ");
//   });
//   })
// })


// describe('#getNextGame()', function() {
//   context('get the next game', function() {
//     it('should be gameid 7', async  function() {
//       const result = await games_utils.getNextGame()
//       common.expect(result.gameid).to.equal(7)
//     })
//   })
// })


// describe('#getTeamLatestGames()', function() {
//   context('get the past games for team 939', function() {
//     it('should be three games', async  function() {
//       const result = await games_utils.getTeamLatestGames(939)
//       common.expect(result.length).to.equal(3)
//     })
//   })

//   context('get the past games for team that does not exist in the DB', function() {
//     it('should return empty array', async  function() {
//       const result = await games_utils.getTeamLatestGames(930)
//       common.expect(result.length).to.equal(0)
//     })
//   })

//   context('non existing team id', function() {
//     it('should be throw error', async  function() {
//       const result = await games_utils.getTeamLatestGames(0)
//       .catch( function(error){
//           common.expect(function() { throw error })
//           .to.throw(Error)
//         })
//     })
//   })
// })


// describe('#getTeamUpcomingGames()', function() {
//   context('get the future games for team 939', function() {
//     it('should be three games', async  function() {
//       const result = await games_utils.getTeamUpcomingGames(939)
//       common.expect(result.length).to.equal(3)
//     })
//   })

//   context('get the future games for team that does not exist in the DB', function() {
//     it('should return empty array', async  function() {
//       const result = await games_utils.getTeamUpcomingGames(930)
//       common.expect(result.length).to.equal(0)
//     })
//   })

//   context('non existing team id', function() {
//     it('should be throw error', async  function() {
//       const result = await games_utils.getTeamUpcomingGames(0)
//       .catch( function(error){
//           common.expect(function() { throw error })
//           .to.throw(Error)
//       })
//     })
//   })
// })


// describe('#getAllPastGames()', function() {
//     const now = new Date()
//     context('get all past games', function() {
//       it('should be six games all with datetime less than now', async  function() {
//         const result = await games_utils.getAllPastGames()
//         common.expect(result.length).to.equal(6)
//         result.map(game => {
//           // Convert each date to Date object to be comparable
//           let game_datetime = new Date(game.GameDateTime)
//           common.expect(game_datetime).to.be.below(now)
//         })
//       })
//     })

//   })


//   describe('#getAllUpcomingGames()', function() {
//     const now = new Date()
//     context('get all future games', function() {
//       it('should be six games all with datetime more than now', async  function() {
//         const result = await games_utils.getAllUpcomingGames()
//         common.expect(result.length).to.equal(6)
//         result.map(game => {
//           // Convert each date to Date object to be comparable
//           let game_datetime = new Date(game.GameDateTime)
//           common.expect(game_datetime).to.be.above(now)
//         })
//       })
//     })

//   })

  describe('#getGamesInfo()', function() {
    context('valid games ids', function() {
      it('should be array of size 1 with GameDatime of 2021-01-03 21:00:00', async  function() {
        const result = await games_utils.getGamesInfo([1])
        common.expect(result.length).to.equal(1)
        const returned_gametime = new Date(result[0].GameDateTime)
        const expected_gametime = new Date("2021-01-03 21:00:00")
        common.expect(returned_gametime.toString()).to.equal(expected_gametime.toString())
      })

    })

    context('valid games ids', function() {
      it('should be array of size 2 with GameDatime of 2021-01-10 21:00:00, 2021-01-13 21:00:00', async  function() {
        const result = await games_utils.getGamesInfo([2,3])
        common.expect(result.length).to.equal(2)
        let returned_gametime = new Date(result[0].GameDateTime)
        let expected_gametime = new Date("2021-01-10 21:00:00")
        common.expect(returned_gametime.toString()).to.equal(expected_gametime.toString())
        let returned_gametime = new Date(result[1].GameDateTime)
        let expected_gametime = new Date("2021-01-13 21:00:00")
        common.expect(returned_gametime.toString()).to.equal(expected_gametime.toString())
      })

    })

  })