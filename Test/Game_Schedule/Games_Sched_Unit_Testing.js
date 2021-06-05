let common = require("../common.js");


let game_utils = require(common.path.join(__dirname, '../../',"Domain","routes","utils","games_utils.js"));
let teams_utils = require(common.path.join(__dirname, '../../',"Domain","routes","utils","teams_utils.js"));

/*
Test game adding procedure with positive (OK) test and negative (Fail) tests.
All the functions in the auth module related to the game adding Use Case will be tested
*/

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
           // add an assertion to check the error
         common.expect(function() { throw error })
        .to.throw(Error);
        })
      })
    })

    context('with team name that does not exists', function() {
      it('should throw error', async  function(){
        await teams_utils.getTeamIdByName("aaaaaaa").catch( function(error){
           // add an assertion to check the error
         common.expect(function() { throw error })
        .to.throw(Error);
        })
      })
    })
  })
})


// describe('#checkDateMatchCurrentSeason()', function() {

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

// describe('#checkTeamLeagueByTeamId()', function() {

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

// describe('#checkIfMathcExists()', function() {

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