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

    
    
  })