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

  // ------ UNIT TESTS ---------
  importTest("Games scheduling Unit Testing", "./UnitTests/Games_Unit_Testing.js");
  importTest("Referee scheduling Unit Testing", "./UnitTests/Referees_Unit_Testing.js");
  importTest("Login Unit Testing", "./UnitTests/Login_Unit_Testing.js");
  importTest("Team Unit Testing", "./UnitTests/Teams_Unit_Testing.js");

  // // ------- INTEGRATION TESTS ---------
  importTest("Games Integration Tests", "./IntegrationTests/Game_Integration_Testing.js");
  importTest("Referees Integration Tests", "./IntegrationTests/Referee_Integration_Testing.js");

  // ------- ACCEPTANCE TESTS ----------
  importTest("Login API Acceptance Testing", "./AcceptanceTests/LoginAPI_Acceptence_Testing.js");
  importTest("Games API Acceptance Testing", "./AcceptanceTests/GameAPI_Acceptance_Testing.js");
  importTest("Referee API Acceptance Testing", "./AcceptanceTests/RefereeAPI_Acceptance_Testing.js");

    // ------- REGRESSION TESTS ----------
  importTest("Regression Tests", "./RegressionTests/Regression_Testing.js");


  after(async function () {
      console.log("Clear the fake username from the DB");
      await common.deleteFakeUser();
  });
});

