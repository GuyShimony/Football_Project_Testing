let common = require("../common.js");

let teams_utils = require(common.path.join(__dirname, '../../',"Domain","teams_utils.js"));
let league_utils = require(common.path.join(__dirname, '../../',"Domain","league_utils.js"));

// let team_info_dem = {data: {data: id=10, coach: {data: birthcountry="Scotland"}}}

describe('#getTeamIdByName()', function() {

    context('with valid teams names', function() {
      it('should return 86', async  function() {
        const id = await teams_utils.getTeamIdByName("Silkeborg")
        common.expect(id).to.equal(86)
      })
    })
    
    context('with no arguments', function() {
      it('should throw error', async  function(){
        await teams_utils.getTeamIdByName("").catch( function(error){
        common.expect(function() { throw error })
        .to.throw(Error);
        })
      })
    })

    context('with team name that does not exists', function() {
      it('should throw error', async  function(){
        await teams_utils.getTeamIdByName("aaaaaaa").catch( function(error){
        common.expect(function() { throw error })
        .to.throw(Error);
        })
      })
    })


describe('#getPreviewTeamData()', function() {

        context('with valid team id', function() {
          it('should return Silkeborg team name', async  function() {
            const team_data = await teams_utils.getPreviewTeamData(86)
            common.expect(team_data["team_name"]).to.equal("Silkeborg")
          })
        })

        context('with invalid team id', function() {
            it('should throw error', async  function() {
            await teams_utils.getPreviewTeamData(0).catch( function(error){
            common.expect(function() { throw error })
            .to.throw(Error);
            })
            })
        })
        
        context('with no arguments', function() {
          it('should throw error', async  function(){
            await teams_utils.getPreviewTeamData("").catch( function(error){
            common.expect(function() { throw error })
            .to.throw(Error);
            })
          })
        })



describe('#getTeamsInfo()', function() {
    context('with valid team', function() {
      it('should return West Ham United', async  function() {
        const result = await teams_utils.getTeamsInfo([1])
        common.expect(result[0]["name"]).to.equal("West Ham United")
      })
    })

    context('with valid team', function() {
        it('should return true', async  function() {
          const result = await teams_utils.getTeamsInfo([2])
          common.expect(result[0]["coach"]["name"]).to.equal("Tony Mowbray")
        })
      })

    context('with no arguments', function() {
      it('should return 0', async  function() {
        const result = await teams_utils.getTeamsInfo([])
        common.expect(result.length).to.equal(0)
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

describe('#checkIfLeagueIsSuperLiga()', function() {
        context('with league Superliga', function() {
          it('should return true', async  function() {
            const result = await league_utils.checkIfLeagueIsSuperLiga(271)
            common.expect(result).to.equal(true)
          })
        })
        context('with league that is not Superliga', function() {
          it('should return false', async  function() {
            const result = await league_utils.checkIfLeagueIsSuperLiga(27)
            common.expect(result).to.equal(false)
          })
        })
      })
