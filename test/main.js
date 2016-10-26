/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const server = require('../index');
const fs = require('fs');

let dummmyInvoice = null;
const agent = request.agent(server);

describe('GET /', () => {
  it('should respond with 200', (done) => {
    agent
      .get('/')
      .expect(200, done);
  });
});

describe('GET /doesnotexist', () => {
  it('should respond with 404', (done) => {
    agent
      .get('/doesnotexist')
      .expect(404, done);
  });
});

describe('POST /pdfs', () => {
  before((done) => {
    const dummmyInvoicePath = `${__dirname}/../dummy_data/invoice.json`;

    fs.readFile(dummmyInvoicePath, 'utf8', (err, data) => {
      if (err) throw err;
      dummmyInvoice = JSON.parse(data);
      done();
    });
  });

  before((done) => {
    server.on('appStarted', () => done());
  });

  it('should respond with 201', (done) => {
    agent
      .post('/pdfs')
      .send({ invoices: [dummmyInvoice] })
      .set('Accept', 'application/json')
      .expect(201, done);
  });
  it('should respond with 400 for bad request', (done) => {
    agent
      .post('/pdfs')
      .send('notvalidjson')
      .set('Accept', 'application/json')
      .expect(400, done);
  });
});
