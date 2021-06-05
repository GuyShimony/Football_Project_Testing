const expect = require("chai").expect
const chaiAsPromised = require("chai-as-promised");
const chaiHttp = require('chai-http');
const chai = require('chai');
const axios = require("axios")
chai.use(chaiHttp);
chai.use(chaiAsPromised);
const path = require("path")
const DButils = require(path.join(__dirname, '../',"Domain","routes","utils","DButils.js"));


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
}

exports.deleteFakeUser = async () =>
{
    await DButils.execQuery(`DELETE FROM Users WHERE username = 'fakeuser'`)
    
}