const express = require('express');
const config = require('./env/config');

const app = express();
const port = config.server.port;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/pdfs', (req, res) => {
  res.status(201).send('Created');
});

app.listen(port, () => {
  console.log('listening on port', port);
});

module.exports = app;
