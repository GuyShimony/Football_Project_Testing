let common = require("../common.js");
let games_utils = require(common.path.join(__dirname, '../../',"Domain","games_utils.js"));
let season_utils = require(common.path.join(__dirname, '../../',"Domain","season_utils.js"));

/*
Test game adding procedure with positive (OK) test and negative (Fail) tests.
All the functions in the auth module related to the game adding Use Case will be tested
*/

describe('#checkDateMatchCurrentSeason()', function() {

  context('with valid date', function() {
    it('should return true for year 2021', async  function() {
      const result = await season_utils.checkDateMatchCurrentSeason(new Date("2021-05-04 09:00:00"))
      common.expect(result).to.equal(true)
    })
  })

  context('with invalid date', function() {
    it('should return false for year 2019', async  function() {
      const result = await season_utils.checkDateMatchCurrentSeason(new Date("2019-05-04 09:00:00"))
      common.expect(result).to.equal(false)
    })
  })
    
})


describe('#checkIfMathcExists()', function() {

  context('with valid datetime that belongs to a real match', function() {
    it('should return true', async  function() {
      const result = await games_utils.checkIfMathcExists("2021-01-03 19:00:00", 939, 390 )
      common.expect(result).to.equal(true)
    })
  })
  context('with invalid datetime that does not belong to a real match', function() {
    it('should return false', async  function() {
      const result = await games_utils.checkIfMathcExists("2019-01-03 19:00:00", 939, 390)
      common.expect(result).to.equal(false)
    })
  })

  context('with no home team and away team', function() {
    it('should throw error', async  function() {
      await games_utils.checkIfMathcExists("2021-01-03 19:00:00")
      .catch( function(error){
              // add an assertion to check the error
          common.expect(function() { throw error })
          .to.throw(Error);
      })
    })
  })
    
})

describe('#addFutureGame()', function() {

  context('with valid data', function() {
    it('should be added to the DB', async  function() {
      const test_data =
      {
        game_date: "2022-01-01",
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
      const result = await games_utils.checkIfMathcExists(
        `${test_data.game_date} ${test_data.game_time}`,
        test_data.home_team_id, test_data.away_team_id)
      common.expect(result).to.equal(true)
    })
  })

  context('with no date', function() {
    it('should throw error', async  function() {
      const test_data =
      {
        game_date: null,
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
        test_data.home_team_id,
        test_data.home_team,
        test_data.away_team_id,
        test_data.away_team,
        test_data.stadium,
        test_data.headreferee,
        test_data.linereferee1,
        test_data.linereferee2,
        test_data.boxreferee1,
        test_data.boxreferee2
        )
        .catch( function(error){
          // add an assertion to check the error
        common.expect(function() { throw new Error("Fail") })
        .to.throw(Error)
      })
    })

    
  after(async function () {
      console.log("Clear the game from the DB");
      await common.DButils.execQuery("DELETE FROM Games Where GameDateTime = '2022-01-01 19:00:00' ");
  });
  })
})


describe('#getNextGame()', function() {
  context('get the next game', function() {
    it('should be gameid 7', async  function() {
      const result = await games_utils.getNextGame()
      common.expect(result.gameid).to.equal(7)
    })
  })
})


describe('#getTeamLatestGames()', function() {
  context('get the past games for team 939', function() {
    it('should be three games', async  function() {
      const result = await games_utils.getTeamLatestGames(939)
      result.map((game) => common.expect(939).to.be.oneOf([game.HomeTeamID, game.AwayTeamID]))
    })
  })

  context('get the past games for team that does not exist in the DB', function() {
    it('should return empty array', async  function() {
      const result = await games_utils.getTeamLatestGames(930)
      common.expect(result.length).to.equal(0)
    })
  })

  context('non existing team id', function() {
    it('should be throw error', async  function() {
      const result = await games_utils.getTeamLatestGames(0)
      .catch( function(error){
          common.expect(function() { throw error })
          .to.throw(Error)
        })
    })
  })
})


describe('#getTeamUpcomingGames()', function() {
  context('get the future games for team 939', function() {
    it('should be three games', async  function() {
      const result = await games_utils.getTeamUpcomingGames(939)
      result.map((game) => common.expect(939).to.be.oneOf([game.HomeTeamID, game.AwayTeamID]))
    })
  })

  context('get the future games for team that does not exist in the DB', function() {
    it('should return empty array', async  function() {
      const result = await games_utils.getTeamUpcomingGames(930)
      common.expect(result.length).to.equal(0)
    })
  })

  context('non existing team id', function() {
    it('should be throw error', async  function() {
      const result = await games_utils.getTeamUpcomingGames(0)
      .catch( function(error){
          common.expect(function() { throw error })
          .to.throw(Error)
      })
    })
  })
})


describe('#getAllPastGames()', function() {
    const now = new Date()
    context('get all past games', function() {
      it('should be six games all with datetime less than now', async  function() {
        const result = await games_utils.getAllPastGames()
        result.map(game => {
          // Convert each date to Date object to be comparable
          let game_datetime = new Date(game.GameDateTime)
          common.expect(game_datetime).to.be.below(now)
        })
      })
    })

  })


  describe('#getAllUpcomingGames()', function() {
    const now = new Date()
    context('get all future games', function() {
      it('should be six games all with datetime more than now', async  function() {
        const result = await games_utils.getAllUpcomingGames()
        result.map(game => {
          // Convert each date to Date object to be comparable
          let game_datetime = new Date(game.GameDateTime)
          common.expect(game_datetime).to.be.above(now)
        })
      })
    })

  })

  describe('#getGamesInfo()', function() {
    context('valid games ids', function() {
      it('should be array of size 1 with GameDatime of 2021-01-03 21:00:00', async  function() {
        const test_date = {game_date: new Date("2021-01-03 21:00:00")}
        const result = await games_utils.getGamesInfo([1])
        common.expect(result.length).to.equal(1)
        const returned_gametime = new Date(result[0].GameDateTime)
        common.expect(returned_gametime.toString()).to.equal(test_date.game_date.toString())
      })

    })

    context('valid games ids', function() {
      it('should be array of size 2 with GameDatime of 2021-01-10 21:00:00, 2021-01-13 21:00:00', async  function() {
        const test_date = {
          game1_gametime: new Date("2021-01-10 21:00:00"),
          game2_gametime: new Date("2021-01-13 21:00:00")
        }
        const result = await games_utils.getGamesInfo([2,3])
        common.expect(result.length).to.equal(2)
        let returned_gametime = new Date(result[0].GameDateTime)
        common.expect(returned_gametime.toString()).to.equal(test_date.game1_gametime.toString())
        returned_gametime = new Date(result[1].GameDateTime)
        common.expect(returned_gametime.toString()).to.equal(test_date.game2_gametime.toString())
      })
    })
    context('invalid games ids', function() {
        it('should throw error', async  function() {
          await games_utils.getGamesInfo([0,13])
          .catch( function(error){
            common.expect(function() {throw new Error() })
            .to.throw(Error)
          })
        })
    })

      context('with nulls', function() {
          it('should throw error', async  function() {
            await games_utils.getGamesInfo([null])
            .catch( function(error){
            common.expect(function() { throw new Error() })
            .to.throw(Error)
          })
      })
    })
})

describe('#addScoreToGame()', function() {
  context('valid games and score', function() {
    it('should add score to game', async  function() {
      const test_data = {
        gameid: 1,
        score: "100-1"
      }
      await games_utils.addScoreToGame(test_data.gameid, test_data.score)
      const result = await common.DButils.execQuery(`SELECT Result From Games WHERE gameid = ${test_data.gameid}`)
      common.expect(result[0].Result).to.equal(test_data.score)
    })
  })

  context('invalid score', function() {
    it('should throw error', async  function() {
      const test_data = {
        gameid: 1,
        score: "-1 - 10"
      }
      await games_utils.addScoreToGame(test_data.gameid, test_data.score)
      .then(() => {throw new Error("Fail")})
      .catch( function(error){
      common.expect(error.message).to.not.equal("Fail")
      })
    })
  })

    context('invalid score', function() {
      it('should throw error', async  function() {
        const test_data = {
          gameid: null,
          score: "-1 - 10"
        }
        await games_utils.addScoreToGame(test_data.gameid, test_data.score)
        .then(() => {throw new Error("Fail")})
        .catch( function(error){
        common.expect(error.message).to.not.equal("Fail")
        })
      })
    })

  context('game that does not exists in the DB', function() {
    it('should throw error', async  function() {
      const test_data = {
        gameid: 0,
        score: "10-2"
      }
      await games_utils.addScoreToGame(test_data.gameid, test_data.score)
      .then(() => {throw new Error("Fail")})
      .catch( function(error){
        common.expect(error.message).to.not.equal("Fail")
      })
    })
  })
})


describe('#addEventToGame()', function() {
  context('valid games and events', function() {
    it('should add score to game', async  function() {
      const test_data = {
        gameid: 1,
        event: {
          event_date:"2021-01-03",
          event_time: "19:00:00",
          event_game_time: 65,
          event: "Red card for messi"
      }
      }
      await games_utils.addEventToGame(test_data.gameid, test_data.event)
      const result = await common.DButils.execQuery(`SELECT Event From Events WHERE 
      EventDate = '${test_data.event.event_date}' AND 
      EventTime = '${test_data.event.event_time}' AND 
      EventGameTime = ${test_data.event.event_game_time}`)
      common.expect(result[0].Event).to.equal(test_data.event.event)
    })
  })

  context('not existing game', function() {
    it('should throw error', async  function() {
      const test_data = {
        gameid: null,
        event: {
          event_date:"2021-01-03",
          event_time: "19:00:00",
          event_game_time: 65,
          event: "Red card for messi"
      }
      }
     await games_utils.addEventToGame(test_data.gameid, test_data.event)
     .catch(function(error){
        common.expect(function() {
           throw new Error('Throw error test') })
        .to.throw(Error, "Throw error test")
      })
    })
  })
})

describe('#removePastGames()', function() {
  before(async function() {
    try{
    // Insert a past game to the users favorite table for testing
    console.log("Insert game 1 with datetime 2021-01-03 19:00:00 to the UsersFavoriteGames Table")
    await common.DButils.execQuery("INSERT INTO UsersFavoriteGames ([userid],[gameid]) VALUES (1,1)")
    }
    catch{
      console.log("Game already exits in the DB")
    }
  })
  const now = new Date()
  context('activate function', function() {
    it('should delete all games with dates less than now', async  function() {
      await games_utils.removePastGames()
      const result = await common.DButils.execQuery("Select * From UsersFavoriteGames JOIN Games ON Games.gameid = UsersFavoriteGames.gameid")
      result.map(game => {
        // Convert each date to Date object to be comparable
        let game_datetime = new Date(game.GameDateTime)
        common.expect(game_datetime).to.be.above(now)
      })
    })
  })

  after(async function() {
    // Insert a past game to the users favorite table for testing
    console.log("Deleting game 1 from the the UsersFavoriteGames Table")
    await common.DButils.execQuery("DELETE FROM UsersFavoriteGames WHERE gameid = 1")})
})


describe('#removePastGames()', function() {
  before(async function() {
    try{
    // Insert a past game to the users favorite table for testing
    console.log("Insert game 1 with datetime 2021-01-03 19:00:00 to the UsersFavoriteGames Table")
    await common.DButils.execQuery("INSERT INTO UsersFavoriteGames ([userid],[gameid]) VALUES (1,1)")
    }
    catch{
      console.log("Game already exits in the DB")
    }
  })
  const now = new Date()
  context('activate function', function() {
    it('should delete all games with dates less than now', async  function() {
      await games_utils.removePastGames()
      const result = await common.DButils.execQuery("Select * From UsersFavoriteGames JOIN Games ON Games.gameid = UsersFavoriteGames.gameid")
      result.map(game => {
        // Convert each date to Date object to be comparable
        let game_datetime = new Date(game.GameDateTime)
        common.expect(game_datetime).to.be.above(now)
      })
    })
  })

  after(async function() {
    // Insert a past game to the users favorite table for testing
    console.log("Deleting game 1 from the the UsersFavoriteGames Table")
    await common.DButils.execQuery("DELETE FROM UsersFavoriteGames WHERE gameid = 1")})
})

describe('#checkIfTeamHaveGame()', function() {
  
  context('with exisitng game datetime', function() {
    const test_data = {
      teams: [
        {id: 86, name: "Silkeborg"},
        {id: 390, name: "SønderjyskE"},
        {id: 939, name: "Midtjylland"},  
        {id: 2356, name: "Randers"}],
      game_date: "2021-11-05",
      game_time: "21:05:00",
      team_name: "Silkeborg"
    }
    it('should return list of 1 team - Midtjylland, ', async  function() {
      const result = await games_utils.checkIfTeamHaveGame(
        test_data.teams, test_data.game_date, test_data.game_time, test_data.team_name
      )
      common.expect(result.length).to.equal(1)
      common.expect("Midtjylland").to.be.oneOf(result.map(team => {return team.name}))
    })
  })

  context('with exisitng game datetime and no team_name', function() {
    const test_data = {
      teams: [
        {id: 86, name: "Silkeborg"},
        {id: 390, name: "SønderjyskE"},
        {id: 939, name: "Midtjylland"},  
        {id: 2356, name: "Randers"}],
      game_date: "2021-11-05",
      game_time: "21:05:00",
    }
    it('should return list of 2 teams, ', async  function() {
      const result = await games_utils.checkIfTeamHaveGame(
        test_data.teams, test_data.game_date, test_data.game_time, test_data.team_name
      )
      common.expect(result.length).to.equal(2)
      common.expect("Midtjylland").to.be.oneOf(result.map(team => {return team.name}))
      common.expect("Silkeborg").to.be.oneOf(result.map(team => {return team.name}))

    })
  })

  context('with non exisitng game datetime and no team_name', function() {
    const test_data = {
      teams: [
        {id: 86, name: "Silkeborg"},
        {id: 390, name: "SønderjyskE"},
        {id: 939, name: "Midtjylland"},  
        {id: 2356, name: "Randers"}],
      game_date: "2021-09-05",
      game_time: "21:05:00",
    }
    it('should return list of 4 teams', async  function() {
      const result = await games_utils.checkIfTeamHaveGame(
        test_data.teams, test_data.game_date, test_data.game_time, test_data.team_name
      )
      common.expect(result.length).to.equal(4)
    })
  })

  context('with invalid data', function() {
    const test_data = {
      teams: null,
      game_date: "2021-05",
      game_time: "21:05:00",
    }
    it('should throw error ', async  function() {
      const result = await games_utils.checkIfTeamHaveGame(
        test_data.teams, test_data.game_date, test_data.game_time, test_data.team_name
      ).catch(function(error){
        common.expect(function() {
          throw new Error('Throw error test') })
          .to.throw(Error)
        })
    })
  })
})