const express = require('express');
const bodyParser = require('body-parser');
const config = require('./env/config');

const app = express();
const port = config.server.port;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/pdfs', (req, res) => {
  if (!req.body.invoices) {

    return res.status(400).send('Not valid JSON');
  }

  return res.status(201).send('Created');
});

app.listen(port, () => {
  console.log('listening on port', port);
});

module.exports = app;
