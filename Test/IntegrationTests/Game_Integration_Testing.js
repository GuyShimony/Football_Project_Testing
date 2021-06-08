let common = require("../common.js");

let games_utils = require(common.path.join(__dirname, '../../',"Domain","games_utils.js"));



function login(agent){
    return agent.post('/login')
    .send({username: "johnc", password: "1234John"})
}

describe('/POST addGame', () => {
    it('should return 201', async  function() {    
    var agent = common.chai.request.agent(`${api_domain}`)

        agent.post('/login')
        .send({username: "johnc", password: "1234John"})
        .end((err, res) => {
          agent.post('/games/addGame')
          .send({
            game_date: "2021-09-09",
            game_time: "20:00:00",
            home_team: "København",
            home_team_id: 85,
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
        })
      })

      })})

// describe('#addgame() and addscore()', function() {

//     context('with valid game time', function() {
//       it('should return 201', async  function() {
//         var agent = common.chai.request.agent(`${api_domain}`)
//         let result =  login(agent).end((err, res) => {
//         agent.post('/games/addGame')
//           .send({
//               game_date: "2021-09-09",
//               game_time: "20:00:00",
//               home_team: "København",
//               home_team_id: 85,
//               away_team: "Silkeborg",
//               away_team_id: 86,
//               stadium: "MCH Arena",
//               headreferee: {user_id: 7, name:"Nick Walsh"},
//               linereferee1: {user_id: 3, name:"Daiyrbek Abdyldayev"},
//               linereferee2: {user_id: 5, name:"Zainiddin Alimov"},
//               boxreferee1: {user_id:6, name:"Bobby Madden"},
//               boxreferee2: {user_id: 2, name:"Denis Shalayev"}
//             })
//           }).end((err, res) => {
//             res.should.have.status(201);
//             res.should.have.property('text').eql('Bad game input. Please check the date or teams');
//             done();
//           })
//         // let upcoming = await games_utils.getAllUpcomingGames()
//         // let shit = await games_utils.getAllUpcomingGames()
//       })
//     })
// })
