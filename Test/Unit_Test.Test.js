var axios = require("axios");
const assert = require("assert");

const api_domain = "https://localhost:3000";


async function getLoginStatus(username, password){
    console.log("HELLO")
    const auth = await axios.post(`${api_domain}/login`, {
        data: {
          username: username,
          password: password
        },
      })
    console.log("HELLO")
    return auth.status
}
describe('Login Test', () => {
 it('correct login should return status code 200', async () => {
        console.log("dsfsdfd")
        let test_result = await getLoginStatus("Johnc","1234John")
        console.log(test_result)
        assert.equal(test_result, 200);
    });
});