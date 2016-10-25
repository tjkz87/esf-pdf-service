const express = require('express');
const config = require('./env/config');

const app = express();
const port = config.server.port;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log('listening on port', port);
});

module.exports = app;
