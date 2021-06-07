let common = require("../common.js");

let teams_utils = require(common.path.join(__dirname, '../../',"Domain","teams_utils.js"));
let league_utils = require(common.path.join(__dirname, '../../',"Domain","league_utils.js"));



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