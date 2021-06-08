const DButils = require("./DButils");

/*
get from the DB info about the user
*/
async function getUserInfo(username){
    const user = (
        await DButils.execQuery(
          `SELECT * FROM Users WHERE username = '${username}'`
        )
      )[0];
      return user
  }

  exports.getUserInfo = getUserInfo;