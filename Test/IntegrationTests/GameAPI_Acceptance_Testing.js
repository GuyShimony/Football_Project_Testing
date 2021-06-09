let common = require("../common.js");



/*
Test game adding / scheduling procedure with positive (OK) test and negative (Fail) tests
*/

describe('/POST addGame', () => {
  it('OK, Match with date that does not match the current season', (done) => {
    
    var agent = common.chai.request.agent(`${api_domain}`)

        agent.post('/login')
        .send({username: "fakeuser", password: "fake"})
        .end((err, res) => {
          agent.post('/games/addGame')
          .send({
            game_date: "2022-01-01",
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
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.should.have.property('text').eql('The game was successfully added');
            done();
          })
      })
  });


  it('Fail, Match with date that does not match the current season', (done) => {
    
    var agent = common.chai.request.agent(`${api_domain}`)

        agent.post('/login')
        .send({username: "johnc", password: "1234John"})
        .end((err, res) => {
          agent.post('/games/addGame')
          .send({
            game_date: "2019-01-01",
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
          })
          .end((res, err) => {
            err.should.have.status(406);
            err.should.have.property('text').eql('Bad game input. Please check the date or teams or referees');
            done();
          })
        })

      });

  it('Fail, "Team West Ham United" does not belong to Superliga', (done) => {
    
        var agent = common.chai.request.agent(`${api_domain}`)
    
            agent.post('/login')
            .send({username: "johnc", password: "1234John"})
            .end((err, res) => {
              agent.post('/games/addGame')
              .send({
                game_date: "2021-01-01",
                game_time: "19:00:00",
                home_team: "West Ham United",
                home_team_id: 1,
                away_team: "Horsens",
                away_team_id: 211,
                stadium: "MCH Arena",
                head_referee: {user_id: 7, name:"Nick Walsh", role:"Head"},
                line_referee1: {user_id: 3, name:"Daiyrbek Abdyldayev", role:"Line"},
                line_referee2: {user_id: 5, name:"Zainiddin Alimov", role:"Line"},
                box_referee1: {user_id:6, name:"Bobby Madden", role:"Box"},
                box_referee2: {user_id: 2, name:"Denis Shalayev", role:"Box"}
              })
              .end((res, err) => {
                err.should.have.status(406);
                err.should.have.property('text').eql('Bad game input. Please check the date or teams or referees');
                done();
              })
            })
  });

  it('Fail, The game already exists in the DB', (done) => {
  
    var agent = common.chai.request.agent(`${api_domain}`)
  
        agent.post('/login')
        .send({username: "johnc", password: "1234John"})
        .end((err, res) => {
          agent.post('/games/addGame')
          .send({
            game_date: "2021-01-03",
            game_time: "19:00:00",
            home_team: "Midtjylland",
            home_team_id: 939,
            away_team: "Sønderjysk",
            away_team_id: 390,
            stadium: "MCH Arena",
            head_referee: {user_id: 7, name:"Nick Walsh", role:"Head"},
            line_referee1: {user_id: 3, name:"Daiyrbek Abdyldayev", role:"Line"},
            line_referee2: {user_id: 5, name:"Zainiddin Alimov", role:"Line"},
            box_referee1: {user_id:6, name:"Bobby Madden", role:"Box"},
            box_referee2: {user_id: 2, name:"Denis Shalayev", role:"Box"}
          })
          .end((res, err) => {
            err.should.have.status(405);
            err.should.have.property('text').eql('The teams already have a match in that date & time');
            done();
          })
        })
    
      });

  it('Fail, The User is not a league representive', (done) => {
        var agent = common.chai.request.agent(`${api_domain}`)
            agent.post('/login')
            .send({username: "aliceLoveBob", password: "1234alice"})
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
                head_referee: {user_id: 7, name:"Nick Walsh", role:"Head"},
                line_referee1: {user_id: 3, name:"Daiyrbek Abdyldayev", role:"Line"},
                line_referee2: {user_id: 5, name:"Zainiddin Alimov", role:"Line"},
                box_referee1: {user_id:6, name:"Bobby Madden", role:"Box"},
                box_referee2: {user_id: 2, name:"Denis Shalayev", role:"Box"}
              })
              .end((res, err) => {
                err.should.have.status(401);
                err.should.have.property('text').eql('Privilege Error: The following action is only permitted to league representives Or you have not Logged in first');
                done();
              })
            })
       
          });

  after(async () => {
      await common.deleteTestGame('2022-01-01','19:00:00', 939, 86)
    })

 });



