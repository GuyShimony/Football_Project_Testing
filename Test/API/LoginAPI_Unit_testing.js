let common = require("../common.js");


/*
Test login procedure with positive (OK) test and negative (Fail) tests
*/
describe('#/POST login', () => {

    context('with valid username and password', function() {
        it('should return status code 200', async  function() {
          const res = await common.chai.request(`${api_domain}`)
          .post('/login')
          .send({username: "fakeuser", password: "fake"})

          common.expect(res.status).to.equal(200)
        })
    })

    context('with invalid username and valid password', function() {
        it('should return 401', async  function() {
        await common.chai.request(`${api_domain}`)
        .post('/login')
        .send({username: "fakeruserr", password: "fake"})
        .then(res => common.expect(res.status).to.equal(401))
        })
    })
    context('with invalid username and valid password', function() {
        it('should return 401', async  function() {
        await common.chai.request(`${api_domain}`)
        .post('/login')
        .send({username: "fakuers", password: "fake"})
        .then(res => common.expect(res.status).to.equal(401))
        })
    })

    context('with valid username and invalid password', function() {
        it('should return 401', async  function() {
        await common.chai.request(`${api_domain}`)
        .post('/login')
        .send({username: "fakeuser", password: "faker"})
        .then(res => common.expect(res.status).to.equal(401))
        })
    })

    context('with no username and password', function() {
        it('should return 401', async  function() {
        await common.chai.request(`${api_domain}`)
        .post('/login')
        .send({username: "", password: ""})
        .then(res => common.expect(res.status).to.equal(401))
        })
    })
    



});

//   it('Fail, incorrect login should return status code 401', async (done) => {
//     await common.chai.request(`${api_domain}`)
//     .post('/login')
//     .send({username: "JohnC", password: "1234John"})
//     .catch(function(error){
//         common.expect(function() { throw error })
//         .to.throw(Error);
//     })

//    })
//   })

//   it('Fail, incorrect login should return status code 401', async (done) => {
//     common.chai.request(`${api_domain}`)
//     .post('/login')
//     .send({username: "CJohnc", password: "1234John"})
//     .end((err, res) => {
//       try{
//           res.should.have.status(401);
//           res.should.have.property('text').eql('Username or Password incorrect');
//           done();
//       }
//       catch(error) {
//         done(error)
//       }
//    })
//   })

//   it('Fail, incorrect login should return status code 401', async () => {
//     common.chai.request(`${api_domain}`)
//         .post('/login')
//         .send({username: "Johnc", password: "124John"})
//         .end((err, res) => {
//               res.should.have.status(401);
//               res.should.have.property('text').eql('Username or Password incorrect')
//     })
//   })

//   it('Fail, incorrect login should return status code 401', async () => {
//     common.chai.request(`${api_domain}`)
//         .post('/login')
//         .send({username: "", password: ""})
//         .end((err, res) => {
//               res.should.have.status(401);
//               res.should.have.property('text').eql('Username or Password incorrect')
//     });
//   });





// /*
// Test game adding / scheduling procedure with positive (OK) test and negative (Fail) tests
// */
// describe('/POST addGame', () => {
//   it('Fail, Match with date that does not match the current season', (done) => {
    
//     var agent = chai.request.agent(`${api_domain}`)

//         agent.post('/login')
//         .send({username: "johnc", password: "1234John"})
//         .end((err, res) => {
//           agent.post('/games/addGame')
//           .send({
//             game_date: "2019-01-01",
//             game_time: "19:00:00",
//             home_team: "Midtjylland",
//             home_team_id: 939,
//             away_team: "Horsens",
//             away_team_id: 211,
//             stadium: "MCH Arena",
//             referee: {
//               name: "Denis Shalayev"
//             }
//           })
//           .end((err, res) => {
//             res.should.have.status(406);
//             res.should.have.property('text').eql('Bad game input. Please check the date or teams');
//             done();
//           })
//         })

//       });

//   it('Fail, "Team West Ham United" does not belong to Superliga', (done) => {
    
//         var agent = chai.request.agent(`${api_domain}`)
    
//             agent.post('/login')
//             .send({username: "johnc", password: "1234John"})
//             .end((err, res) => {
//               agent.post('/games/addGame')
//               .send({
//                 game_date: "2019-01-01",
//                 game_time: "19:00:00",
//                 home_team: "West Ham United",
//                 home_team_id: 1,
//                 away_team: "Horsens",
//                 away_team_id: 211,
//                 stadium: "MCH Arena",
//                 referee: {
//                   name: "Denis Shalayev"
//                 }
//               })
//               .end((err, res) => {
//                 res.should.have.status(406);
//                 res.should.have.property('text').eql('Bad game input. Please check the date or teams');
//                 done();
//               })
//             })
//   });

//   it('Fail, The game already exists in the DB', (done) => {
  
//     var agent = chai.request.agent(`${api_domain}`)
  
//         agent.post('/login')
//         .send({username: "johnc", password: "1234John"})
//         .end((err, res) => {
//           agent.post('/games/addGame')
//           .send({
//             game_date: "2021-01-03",
//             game_time: "19:00:00",
//             home_team: "Midtjylland",
//             home_team_id: 939,
//             away_team: "København",
//             away_team_id: 85,
//             stadium: "MCH Arena",
//             referee: {
//               name: null
//             }
//           })
//           .end((err, res) => {
//             res.should.have.status(405);
//             res.should.have.property('text').eql('The teams already have a match in that date & time');
//             done();
//           })
//         })
    
//       });

//   it('Fail, The User is not a league representive', (done) => {
//         var agent = chai.request.agent(`${api_domain}`)
//             agent.post('/login')
//             .send({username: "edenY", password: "1234eden"})
//             .end((err, res) => {
//               agent.post('/games/addGame')
//               .send({
//                 game_date: "2021-01-03",
//                 game_time: "19:00:00",
//                 home_team: "Midtjylland",
//                 home_team_id: 939,
//                 away_team: "København",
//                 away_team_id: 85,
//                 stadium: "MCH Arena",
//                 referee: {
//                   name: null
//                 }
//               })
//               .end((err, res) => {
//                 res.should.have.status(401);
//                 res.should.have.property('text').eql('Privilege Error: The following action is only permitted to league representives Or you have not Logged in first');
//                 done();
//               })
//             })
       
//           });
// });



