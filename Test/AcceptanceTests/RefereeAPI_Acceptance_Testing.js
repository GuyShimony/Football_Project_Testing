let common = require("../common.js");



/*
Test referee adding / scheduling procedure with positive (OK) test and negative (Fail) tests
*/
describe('/POST registerAsReferee', () => {
    it('OK, new referee', (done) => {
      
      var agent = common.chai.request.agent(`${api_domain}`)
  
          agent.post('/login')
          .send({username: "fakeuser", password: "fake"})
          .end((err, res) => {
            agent.post('/users/registerAsReferee')
            .send({
             user_id: common.getFakeUserUserId(),
             name: "fake faker",
             role: "Head"
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.should.have.property('text').eql('Referee added');
              done();
            })
          })

        });
  
  
    it('Fail, bad role was sent ', (done) => {
      
      var agent = common.chai.request.agent(`${api_domain}`)
  
          agent.post('/login')
          .send({username: "fakeuser", password: "fake"})
          .end((err, res) => {
            agent.post('/users/registerAsReferee')
            .send({
                user_id: common.getFakeUserUserId(),
                name: "fakeuser",
                role: "Fake Role"
            })
            .end((res, err) => {
              err.should.have.status(406);
              err.should.have.property('text').eql('Bad input. Please check the name or the role');
              done();
            })
          })
  
        });

    it('Fail, Referee already exists ', (done) => {
      
        var agent = common.chai.request.agent(`${api_domain}`)
    
            agent.post('/login')
            .send({username: "fakeuser", password: "fake"})
            .end((err, res) => {
                agent.post('/users/registerAsReferee')
                .send({
                user_id: common.getFakeUserUserId(),
                name: "fake faker",
                role: "Head"
                })
                .end((res, err) => {
                err.should.have.status(405);
                err.should.have.property('text').eql('Referee already exists');
                done();
                })
            })
    });
});
  
  
  
  