let common = require("../common.js");

let auth_utils = require(common.path.join(__dirname, '../../',"Domain","auth_utils.js"));

describe('#getUserInfo()', function() {

    context('with existing user', function() {
      it('should return fake', async  function() {
        const info = await auth_utils.getUserInfo("fakeuser")
        common.expect(info["firstname"]).to.equal("fake")
      })
    })
    
    context('with invalid user', function() {
        it('should return undefined', async  function() {
            const info = await auth_utils.getUserInfo("doesnotexists")
            common.expect(info).to.be.undefined
          })
        })

    context('with invalid user', function() {
        it('should return undefined', async  function() {
            const info = await auth_utils.getUserInfo("")
            common.expect(info).to.be.undefined
            })
        })
    })