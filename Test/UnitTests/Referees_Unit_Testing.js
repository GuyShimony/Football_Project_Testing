let common = require("../common.js");


let users_utils = require(common.path.join(__dirname, '../../',"Domain","users_utils.js"));

/*
Test referees scheduling procedure with positive (OK) test and negative (Fail) tests.
All the functions in the auth module related to the referees scheduling Use Case will be tested
*/

describe('#checkuserFullName()', function() {
    context('with valida data', function() {
        let test_data = {id: 2, name: "Denis Shalayev"}
        it('should return true', async  function() {
            const result = await users_utils.checkuserFullName(test_data.id, test_data.name)
            common.expect(result).to.equal(false)
        })
    })
    context('with incorrect data', function() {
        let test_data = {id: 2, name: "William Collum"}
        it('should return false', async  function() {
            const result = await users_utils.checkuserFullName(test_data.id, test_data.name)
            common.expect(result).to.equal(true)
      })
    })  

    context('with invalid data', function() {
        let test_data = {id: null, name: "William Collum"}
        it('should throw error', async  function() {
            await users_utils.checkuserFullName(test_data.id, test_data.name)
            .catch(function(error){
                common.expect(function() {
                throw new Error('Throw error test') })
                .to.throw(Error)
            })  
    })
    })  
  })

describe('#checkIfRefereeExist()', function() {
    context('with a userid that matches a refree', function() {
      it('should return true', async  function() {
        let test_data = 3
        const result = await users_utils.checkIfRefereeExist(test_data)
        common.expect(result).to.equal(true)
      })
    })
    context('with a userid that does not matches a refree', function() {
      it('should return false', async  function() {
        let test_data = 0
        const result = await users_utils.checkIfRefereeExist(test_data)
        common.expect(result).to.equal(false)
      })
    })  
  })

  describe('#checkIfFreeHeadReferees()', function() {
    context('with a date that have a scheduled game', function() {
        let test_data = {game_date: "2021-08-01", game_time: "19:00:00"}
      it('should return only 1 referee', async  function() {
        const result = await users_utils.checkIfFreeHeadReferees(test_data.game_date, test_data.game_time)
        common.expect(result.length).to.equal(1)
        common.expect(result[0].Name).to.equal("William Collum")
      })
    })
    context('with a date that does not exists', function() {
        let test_data = {game_date: "2021-09-08", game_time: "17:00:00"}
      it('should return 2 referees', async  function() {
        const result = await users_utils.checkIfFreeHeadReferees(test_data.game_date, test_data.game_time)
        common.expect(result.length).to.equal(2)
      })
    }) 
    context('with invalid data', function() {
        let test_data = {game_date: null, game_time: "17:00:00"}
      it('should should throw error', async  function() {
        await users_utils.checkIfFreeHeadReferees(test_data.game_date, test_data.game_time)
        .catch(function(error){
            common.expect(function() {
            throw new Error('Throw error test') })
            .to.throw(Error)
        })  
      })
    })
}) 

describe('#checkIfFreeLineReferees()', function() {
        context('with a date that have a scheduled game', function() {
            let test_data = {game_date: "2021-08-01", game_time: "19:00:00"}
          it('should return only 0 referees', async  function() {
            const result = await users_utils.checkIfFreeLineReferees(test_data.game_date, test_data.game_time)
            common.expect(result.length).to.equal(0)
          })
        })
        context('with a date that does not exists', function() {
            let test_data = {game_date: "2021-09-08", game_time: "17:00:00"}
          it('should return 2 referees', async  function() {
            const result = await users_utils.checkIfFreeLineReferees(test_data.game_date, test_data.game_time)
            common.expect(result.length).to.equal(2)
          })
        }) 
        context('with invalid data', function() {
            let test_data = {game_date: null, game_time: "17:00:00"}
          it('should throw error', async  function() {
            await users_utils.checkIfFreeLineReferees(test_data.game_date, test_data.game_time)
            .catch(function(error){
                common.expect(function() {
                throw new Error('Throw error test') })
                .to.throw(Error)
            })  
          })
        }) 
})

describe('#checkIfFreeBoxReferees()', function() {
    context('with a date that have a scheduled game', function() {
        let test_data = {game_date: "2021-08-01", game_time: "19:00:00"}
      it('should return only 0 referees', async  function() {
        const result = await users_utils.checkIfFreeBoxReferees(test_data.game_date, test_data.game_time)
        common.expect(result.length).to.equal(0)
      })
    })
    context('with a date that does not exists', function() {
        let test_data = {game_date: "2021-09-08", game_time: "17:00:00"}
      it('should return 2 referees', async  function() {
        const result = await users_utils.checkIfFreeBoxReferees(test_data.game_date, test_data.game_time)
        common.expect(result.length).to.equal(2)
      })
    }) 
    context('with invalid data', function() {
        let test_data = {game_date: null, game_time: "17:00:00"}
      it('should throw error', async  function() {
        await users_utils.checkIfFreeBoxReferees(test_data.game_date, test_data.game_time)
        .catch(function(error){
            common.expect(function() {
            throw new Error('Throw error test') })
            .to.throw(Error)
        })  
      })
    }) 
})

describe('#addReferee()', function() {
    context('with a valid data', function() {
        let test_data = {userid:30, name: "fakeuser", role: "Head"}
      it('should add the referee to the DB', async  function() {
        await users_utils.addReferee(test_data.userid, test_data.name, test_data.role)
        const result = await common.DButils.execQuery(`SELECT * FROM Referees WHERE userid = ${test_data.userid}`)
        common.expect(result.length).to.equal(1)
      })
      after(async function () {
        console.log("Clear the fake username from the DB");
        await common.DButils.execQuery(`DELETE FROM Referees WHERE userid = ${test_data.userid}`)
    });
    })

    context('with invalid data', function() {
        let test_data = {userid:null, name: "fakeuser", role: "Head"}
        it('should throw error', async  function() {
         await users_utils.addReferee(test_data.userid, test_data.name, test_data.role)
        .catch(function(error){
            common.expect(function() {
            throw new Error('Throw error test') })
            .to.throw(Error)
        })  
      })
    })
})

  