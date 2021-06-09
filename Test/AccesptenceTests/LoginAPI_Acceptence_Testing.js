let common = require("../common.js");


/*
Test login procedure with positive (OK) test and negative (Fail) tests
*/
describe('/POST login', () => {

    context('with valid username and password', function() {
        it('should return status code 200 with set-cookie property', async  function() {
          const res = await common.chai.request(`${api_domain}`)
          .post('/login')
          .send({username: "fakeuser", password: "fake"})
            
          common.expect(res.status).to.equal(200)
          common.expect(res.headers).to.have.property('set-cookie');
        })
    })

    context('with invalid username and valid password', function() {
        it('should return 401 without the set-cookie property', async  function() {
        await common.chai.request(`${api_domain}`)
        .post('/login')
        .send({username: "fakeruserr", password: "fake"})
        .then(res => {
            common.expect(res.status).to.equal(401)
            common.expect(res.headers).to.not.have.property('set-cookie');
        })
        })
    })
    context('with invalid username and valid password', function() {
        it('should return 401 without the set-cookie property', async  function() {
        await common.chai.request(`${api_domain}`)
        .post('/login')
        .send({username: "fakuers", password: "fake"})
        .then(res => {
            common.expect(res.status).to.equal(401)
            common.expect(res.headers).to.not.have.property('set-cookie');
        })
        })
    })

    context('with valid username and invalid password', function() {
        it('should return 401 without the set-cookie property', async  function() {
        await common.chai.request(`${api_domain}`)
        .post('/login')
        .send({username: "fakeuser", password: "faker"})
        .then(res => {
            common.expect(res.status).to.equal(401)
            common.expect(res.headers).to.not.have.property('set-cookie');
        })
        })
    })

    context('with no username and password', function() {
        it('should return 401 without the set-cookie property', async  function() {
        await common.chai.request(`${api_domain}`)
        .post('/login')
        .send({username: "", password: ""})
        .then(res => {
            common.expect(res.status).to.equal(401)
            common.expect(res.headers).to.not.have.property('set-cookie');
        })
        })
    })

});


