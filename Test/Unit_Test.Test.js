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

  before(async function () {
    console.log( "Creating a fake user name for the api tests in the DB");
    await common.createFakeUser();
  });
  //importTest("Game scheduling", "./Game_Schedule/games_utils_Unit_Testing.js");
  //importTest("Login", "./IntegrationTests/LoginAPI_Integration_Testing.js");
  // before(async function () {
  //   console.log( "Creating a fake user name for the api tests in the DB");
  //   await common.createFakeUser();
  // });
  // importTest("Game scheduling", "./UnitTests/Games_Unit_Testing.js");
  //importTest("Referee scheduling", "./UnitTests/Referees_Unit_Testing.js");
  // importTest("Game API", "./IntegrationTests/GameAPI_Integration_Testing.js");
  importTest("Referee API", "./IntegrationTests/RefereeAPI_Integration_Testing.js");

  //importTest("Team Tests", "./UnitTests/Teams_Unit_Testing.js");
  //importTest("Regression Tests", "./RegressionTests/Regression_Testing.js");
  //importTest("Login Tests", "./UnitTests/Login_Unit_Testing.js");
  // importTest("Games Integration Tests", "./IntegrationTests/Game_Integration_Testing.js");
  // importTest("Referees Integration Tests", "./IntegrationTests/Referee_Integration_Testing.js");

  after(async function () {
      console.log("Clear the fake username from the DB");
      await common.deleteFakeUser();
  });
});

