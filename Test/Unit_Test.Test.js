var axios = require("axios");
const expect = require("chai").expect
let chaiHttp = require('chai-http');
const chaiAsPromised = require("chai-as-promised");

let chai = require('chai');
let should = chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised);

const api_domain = "http://localhost:3000";



/*
Test login procedure with positive (OK) test and negative (Fail) tests
*/
describe('/POST login', () => {
  it('OK,  Correct username and password', async () => {
    chai.request(`${api_domain}`)
        .post('/login')
        .send({username: "Johnc", password: "1234John"})
        .end((err, res) => {
              res.should.have.status(200);
              res.should.have.property('text').eql('Login succeeded')
      });
    });

  it('Fail, incorrect login should return status code 401', async () => {
    chai.request(`${api_domain}`)
    .post('/login')
    .send({username: "JohnC", password: "1234John"})
    .end((err, res) => {
          res.should.have.status(401);
          res.should.have.property('text').eql('Username or Password incorrect');
         console.log(res.status)

   })
   .abort(err => done(err));
  });

  it('Fail, incorrect login should return status code 401', async () => {
        chai.request(`${api_domain}`)
        .post('/login')
        .send({username: "Johnc", password: "124John"})
        .end((err, res) => {
              res.should.have.status(401);
              res.should.have.property('text').eql('Username or Password incorrect')
  })
});

  it('Fail, incorrect login should return status code 401', async () => {
        chai.request(`${api_domain}`)
        .post('/login')
        .send({username: "", password: ""})
        .end((err, res) => {
              res.should.have.status(401);
              res.should.have.property('text').eql('Username or Password incorrect')
  });
});

});



// describe('/POST login', () => {
//   it('Fail, Login need to fail with bad username or password', (done) => {
//     chai.request(`${api_domain}`)
//         .post('/login')
//         .send({username: "johnc", password: "1234john"})
//         .end((err, res) => {
//               res.should.have.status(401);
//               res.should.have.property('text').eql('Username or Password incorrect')
//           done();
//         });
//   });
// });


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
// });

// describe('/POST addGame', () => {
//   it('Fail, "Team West Ham United" does not belong to Superliga', (done) => {
    
//     var agent = chai.request.agent(`${api_domain}`)

//         agent.post('/login')
//         .send({username: "johnc", password: "1234John"})
//         .end((err, res) => {
//           agent.post('/games/addGame')
//           .send({
//             game_date: "2019-01-01",
//             game_time: "19:00:00",
//             home_team: "West Ham United",
//             home_team_id: 1,
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
// });

// describe('/POST addGame', () => {
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
// });

describe('/POST addGame', () => {
  it('Fail, The User is not a league representive', (done) => {
    
    var agent = chai.request.agent(`${api_domain}`)

        agent.post('/login')
        .send({username: "edenY", password: "1234eden"})
        .end((err, res) => {
          agent.post('/games/addGame')
          .send({
            game_date: "2021-01-03",
            game_time: "19:00:00",
            home_team: "Midtjylland",
            home_team_id: 939,
            away_team: "København",
            away_team_id: 85,
            stadium: "MCH Arena",
            referee: {
              name: null
            }
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.should.have.property('text').eql('Privilege Error: The following action is only permitted to league representives Or you have not Logged in first');
            done();
          })
        })
   
      });
});






// describe("POST /login", () => {
//   it("Fail, Login need to fail", (done) => {
//     axios.post(`${api_domain}/login`, {username: "johnc", password: "124john"})
//     .then(response => {
//       expect.fail(null, null, "Should have failed with bad username or password")
//     })
//     .catch(error => {
//       expect(error.response.status).to.equal(401)
//       done()})
//   })
// })
