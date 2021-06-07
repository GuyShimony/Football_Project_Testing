/*
name - the name of the test that will be shown in the screen.
path - the path to the test file
*/
function importTest(name, path) {
  describe(name, function () {
      require(path);
  });
}


/*
The main file that will run each test.
*/
describe("Starting to run tests", function () {

  const common = require("./common.js");

<<<<<<< HEAD
  before(async function () {
    console.log( "Creating a fake user name for the api tests in the DB");
    await common.createFakeUser();
  });
  //importTest("Game scheduling", "./Game_Schedule/Games_Sched_Unit_Testing.js");
  //importTest("Login", "./API/LoginAPI_Unit_Testing.js");
  //importTest("Team Tests", "./UnitTests/Teams_Unit_Testing.js");
  importTest("Game regression Tests", "./RegressionTests/Games_Regression_Testing.js");
  importTest("Game scheduling", "./Game_Schedule/Games_Sched_Unit_Testing.js");
  
  after(async function () {
      console.log("Clear the fake username from the DB");
      await common.deleteFakeUser();
  });
=======
  // before(async function () {
  //   console.log( "Creating a fake user name for the api tests in the DB");
  //   await common.createFakeUser();
  // });
  importTest("Game scheduling", "./Game_Schedule/games_utils_Unit_Testing.js");
  // importTest("Login", "./IntegrationTests/LoginAPI_Integration_Testing.js");
  // importTest("Team Tests", "./UnitTests/Teams_Unit_Testing.js");

  // after(async function () {
  //     console.log("Clear the fake username from the DB");
  //     await common.deleteFakeUser();
  // });
>>>>>>> c3f53291136975fefac6cc4547ffba6433799dc4
});

