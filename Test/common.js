/*
 ---------- External libs imports -------------
*/
const expect = require("chai").expect
const chaiAsPromised = require("chai-as-promised");
const chaiHttp = require('chai-http');
const chai = require('chai');
const axios = require("axios")
chai.use(chaiHttp);
chai.use(chaiAsPromised);
const path = require("path")
const DButils = require(path.join(__dirname, '../',"Domain","DButils.js"));

/*
 ---------- Constants -------------
*/
const fake_user = {
    username: "fakeuser",
    firstname: "fake",
    lastname: "faker",
    country: "Something",
    password: "fake",
    email: "fake@example.com",
    imageurl: "https:\\fake-profile.com"
}
const test_game = {
    game_date: "2022-10-10",
    game_time: "19:00:00",
    home_team: "Midtjylland",
    home_team_id: 939,
    away_team: "Silkeborg",
    away_team_id: 86,
    stadium: "MCH Arena",
    head_referee: {user_id: 7, name:"Nick Walsh", role:"Head"},
    line_referee1: {user_id: 3, name:"Daiyrbek Abdyldayev", role:"Line"},
    line_referee2: {user_id: 5, name:"Zainiddin Alimov", role:"Line"},
    box_referee1: {user_id:6, name:"Bobby Madden", role:"Box"},
    box_referee2: {user_id: 2, name:"Denis Shalayev", role:"Box"}
}

/*
 ---------- Constants EXPORT-------------
*/
exports.api_domain = api_domain = "http://localhost:3000";
exports.chai = chai
exports.chaiAsPromised = chaiAsPromised
exports.should = chai.should();
exports.expect = require("chai").expect
exports.assert = chai.assert;
exports.path = path
exports.axios = axios
exports.DButils = DButils

exports.test_game = test_game
exports.fake_user = fake_user

/*
 ---------- Functions EXPORT-------------
*/
exports.createFakeUser = async () =>
{
    let user = await DButils.execQuery(`SELECT userid FROM Users WHERE username = 'fakeuser'`)
    if (user.length > 0)
        return user

    await axios.post(
        `${api_domain}/register`,
        { username: fake_user.username,
        firstname: fake_user.firstname,
        lastname: fake_user.lastname,
        country: fake_user.country,
        password: fake_user.password,
        email: fake_user.email,
        imageurl: fake_user.imageurl}
    )

    let userid = await DButils.execQuery(`SELECT userid FROM Users WHERE username = '${fake_user.username}'`)
    userid = userid[0].userid;

    await DButils.execQuery(`INSERT INTO LeagueRepsUsers VALUES (${userid})`)
}

exports.deleteFakeUser = async () =>
{
    console.log("Deleting the refreee that was added in the test")  
    let userid = await this.getFakeUserUserId()
    await DButils.execQuery(`DELETE FROM Users WHERE userid = ${userid}`)
    await DButils.execQuery(`DELETE FROM LeagueRepsUsers WHERE userid = ${userid}`)
    await DButils.execQuery(`DELETE FROM Referees WHERE userid = ${userid}`)
}

exports.getFakeUserUserId = async () => {
    console.log("Searching for the fake username")
    let userid = await DButils.execQuery(`SELECT userid FROM Users WHERE username = '${fake_user.username}'`)
    return userid[0].userid
}

exports.deleteTestGame = async (game_date="2022-10-10", game_time="19:00:00", home_team_id=939, away_team_id=86, gameid=1) => {
    console.log("Deleting the game that was added in the test")  
    await DButils.execQuery(`DELETE FROM Games Where
    GameDateTime = '${game_date} ${game_time}' AND
    HomeTeamID = ${home_team_id} AND
    AwayTeamID = ${away_team_id}`)

    console.log("Deleting game 1 from the the UsersFavoriteGames Table")
    await DButils.execQuery(`DELETE FROM UsersFavoriteGames WHERE gameid = ${gameid}`)
}

exports.createTestGame = async (game_date=test_game.game_date, game_time=test_game.game_time,
    HomeTeamID=test_game.home_team_id, HomeTeam=test_game.home_team,
    AwayTeamID=test_game.away_team_id, AwayTeam=test_game.away_team,
     stadium=test_game.stadium, headreferee=test_game.head_referee,
     linereferee1=test_game.line_referee1, linereferee2=test_game.line_referee2,
     boxreferee1=test_game.box_referee1, boxreferee2=test_game.box_referee2
     ) => {
    console.log("Creating the game for the test")  
    await DButils.execQuery(`INSERT INTO Games
    ([GameDateTime],[HomeTeam],[HomeTeamID],[AwayTeam],
      [AwayTeamID], [Stadium], [HeadReferee], [HeadRefereeID], [LineReferee1], [LineRefereeID1]
      , [LineReferee2], [LineRefereeID2], [BoxReferee1], [BoxRefereeID1], [BoxReferee2], [BoxRefereeID2])
    VALUES ('${game_date} ${game_time}', '${HomeTeam}',${HomeTeamID},'${AwayTeam}',${AwayTeamID}
    ,'${stadium}', '${headreferee.name}','${headreferee.user_id}', '${linereferee1.name}','${linereferee1.user_id}',
    '${linereferee2.name}','${linereferee2.user_id}', '${boxreferee1.name}','${boxreferee1.user_id}',
    '${boxreferee2.name}','${boxreferee2.user_id}' )`);
}

exports.createTestFavGame = async (userid=1, gameid=6) => {
    try{
        console.log("Insert game 1 with datetime 2021-02-03 19:00:00 to the UsersFavoriteGames Table")
        await DButils.execQuery(`INSERT INTO UsersFavoriteGames ([userid],[gameid]) VALUES (${userid},${gameid})`)
    }
    catch (error) {
        console.log(error)
        console.log("Game already exits in the DB")
      }
}

exports.deleteFakeReferee = async (userid=1) => {
    console.log("Deleting fake user from Referees Table")
    await DButils.execQuery(`DELETE FROM Referees WHERE userid = ${userid}`)
}