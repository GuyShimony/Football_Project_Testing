let common = require("../common.js");


let games_utils = require(common.path.join(__dirname, '../../',"Domain","games_utils.js"));
let teams_utils = require(common.path.join(__dirname, '../../',"Domain","teams_utils.js"));
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

describe('#checkTeamLeagueByTeamId()', function() {
  context('with Superliga team', function() {
    it('should return true', async  function() {
      const result = await teams_utils.checkTeamLeagueByTeamId(86)
      common.expect(result).to.equal(true)
    })
  })
  context('with team that does not belong to Superliga', function() {
    it('should return false', async  function() {
      const result = await teams_utils.checkTeamLeagueByTeamId(930)
      common.expect(result).to.equal(false)
    })
  })
})

describe('#checkIfMathcExists()', function() {

  context('with valid datetime that belongs to a real match', function() {
    it('should return true', async  function() {
      const result = await games_utils.checkIfMathcExists("2021-01-03 19:00:00")
      common.expect(result).to.equal(true)
    })
  })
  context('with invalid datetime that does not belong to a real match', function() {
    it('should return false', async  function() {
      const result = await games_utils.checkIfMathcExists("2021-01-03 19:00:00")
      common.expect(result).to.equal(false)
    })
  })
    
})

// describe('#addFutureGame()', function() {

//     context('without arguments', function() {
//       it('should return 0', function() {
//         expect(sum()).to.equal(0)
//       })
//     })
    
//     context('with number arguments', function() {
//       it('should return sum of arguments', function() {
//         expect(sum(1, 2, 3, 4, 5)).to.equal(15)
//       })
      
//       it('should return argument when only one argument is passed', function() {
//         expect(sum(5)).to.equal(5)
//       })
//     })
    
//     context('with non-number arguments', function() {
//       it('should throw error', function() {
//         expect(function() {
//           sum(1, 2, '3', [4], 5)
//         }).to.throw(TypeError, 'sum() expects only numbers.')
//       })
//     })
    
//   })