const common = require("./common.js");
function importTest(name, path) {
  describe(name, function () {
      require(path);
  });
}



describe("top", function () {

  const common = require("./common.js");

  before(async function () {
    console.log( "Creating a fake user name for the api tests in the DB");
    await common.createFakeUser();
  });
  // importTest("Game scheduling", "./Game_Schedule/Games_Sched_Unit_Testing.js");
  importTest("Login", "./API/LoginAPI_Unit_Testing.js");

  after(async function () {
      console.log("Clear the fake username from the DB");
      await common.deleteFakeUser();
  });
});

