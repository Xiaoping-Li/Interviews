// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Ping Server", () => {
  describe("GET /", () => {
    it("should get success:true", (done) => {
      chai.request(server)
        .get('/api/ping')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    })
  })
});

describe("Posts", () => {
  describe("GET /", () => {
    // Test error without tags query
    it("should get 'error': 'Tags parameter is required'", (done) => {
      chai.request(server)
        .get('/api/posts')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        })
    });

    // Test to get posts with default sorted by id asc ordering
    it("should get posts by specific tags sorted by id in ascending order", (done) => {
      const tags = 'tech,health';
      chai.request(server)
        .get(`/api/posts?tags=${tags}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    })
  })
});