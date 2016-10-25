/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const server = require('../index');

describe('GET /', () => {
  it('should respond with 200', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });
});
