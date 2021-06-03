var axios = require("axios");
const assert = require("assert");
const { Console } = require("console");

const api_domain = "http://localhost:3000";


describe('Login Test', () => {
    it('correct login should return status code 200', async () => {
        let res = await axios.post(`${api_domain}/login`, {
                username: "Johnc",
                password: "1234John"
            })
            assert.equal(res.status, 200);
        });
    it('incorrect login should return status code 401', async (done) => {
        try{
            let res2 = await axios.post(`${api_domain}/login`, {
                    username: "JohnCsf",
                    password: "1234John"
                })
            console.log(res2.status)
            assert.equal(res2.status, 401);
            done()
        }
        catch(err){
            assert.equal(err, 401);}
            done(err)
        }

        );

    it('incorrect login should return status code 401', async () => {
        let res3 = await axios.post(`${api_domain}/login`, {
                username: "Johnc",
                password: "124John"
            })
        console.log(res3.status)
        assert.equal(res3.status, 401);
    });
    it('incorrect login should return status code 401', async () => {
        let res4 = await axios.post(`${api_domain}/login`, {
                username: "",
                password: ""
            })
        assert.equal(res4.status, 401);
    });


});