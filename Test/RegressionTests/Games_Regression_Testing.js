let common = require("../common.js");


let games_utils = require(common.path.join(__dirname, '../../',"Domain","games_utils.js"));


describe('#deleteGame()', function() {

    context('with valid game time', function() {
      it('should return true', async  function() {
        const result = await games_utils.deleteGame("2021-08-01 19:00:00")
        common.expect(result).to.equal(true)
      })
    })
})
