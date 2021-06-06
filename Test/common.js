const expect = require("chai").expect
const chaiAsPromised = require("chai-as-promised");
const chaiHttp = require('chai-http');
const chai = require('chai');
const axios = require("axios")
chai.use(chaiHttp);
chai.use(chaiAsPromised);
const path = require("path")
const DButils = require(path.join(__dirname, '../',"Domain","DButils.js"));


exports.api_domain = api_domain = "http://localhost:3000";
exports.chai = chai
exports.chaiAsPromised = chaiAsPromised
exports.should = chai.should();
exports.expect = require("chai").expect
exports.assert = chai.assert;
exports.path = path
exports.axios = axios
exports.DButils = DButils

exports.createFakeUser = async () =>
{
    let user = await DButils.execQuery(`SELECT userid FROM Users WHERE username = 'fakeuser'`)
    if (user.length > 0)
        return user

    await axios.post(
        `${api_domain}/register`,
        { username: "fakeuser",
        firstname: "fake",
        lastname: "faker",
        country: "Something",
        password: "fake",
        email: "fake@example.com",
        imageurl: "https:\\fake-profile.com"}
    )

    let userid = await DButils.execQuery(`SELECT userid FROM Users WHERE username = 'fakeuser'`)
    userid = userid[0].userid;

    await DButils.execQuery(`INSERT INTO LeagueRepsUsers VALUES (${userid})`)
}

exports.deleteFakeUser = async () =>
{
    let userid = await DButils.execQuery(`SELECT userid FROM Users WHERE username = 'fakeuser'`)
    userid = userid[0].userid;
    await DButils.execQuery(`DELETE FROM Users WHERE userid = ${userid}`)
    await DButils.execQuery(`DELETE FROM LeagueRepsUsers WHERE userid = ${userid}`)
}