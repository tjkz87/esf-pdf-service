/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const server = require('../index');

describe('GET /', () => {
  it('should respond with 200', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /doesnotexist', () => {
  it('should respond with 404', (done) => {
    request(server)
      .get('/doesnotexist')
      .expect(404, done);
  });
});

describe('POST /pdfs', () => {
  it('should respond with 201', (done) => {
    request(server)
      .post('/pdfs')
      .expect(201, done);
  });
});
