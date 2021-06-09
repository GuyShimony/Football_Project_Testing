let common = require("../common.js");


let games_utils = require(common.path.join(__dirname, '../../',"Domain","games_utils.js"));
let games = require(common.path.join(__dirname, '../../',"Service","games.js"));



/*
Test login procedure with positive (OK) test and negative (Fail) tests
*/
describe('Delete Game Regression Test', () => {

  context('with valid game time', function() {
    it('should raise error (function was implented incorrectly)', async  function() {
      await common.chai.request(`${api_domain}`)
        .get('/games/deletegame')
        .send({game_date: "2021-08-01", game_time: "19:00:00"}).catch( function(error){
      common.expect(function() { throw error })
      .to.throw(Error);
        })
      })
  })
})
