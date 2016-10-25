const request = require('supertest');
const server = require('../index');

describe('GET /', function() {
  it('should respond with 200', function(done) {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
