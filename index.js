const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const config = require('./env/config');
const fs = require('fs');

const app = express();
const port = config.server.port;
let dummyInvoice = null;

app.use(bodyParser.json());

fs.readFile('./dummy_data/invoice_add.json', 'utf8', (err, data) => {
  if (err) throw err;
  dummyInvoice = JSON.parse(data);
  dummyInvoice.invoice.consignor = dummyInvoice.invoice.consignor || {};
  dummyInvoice.invoice.consignee = dummyInvoice.invoice.consignee || {};
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/pdfs', (req, res) => {
  if (!req.body.invoices) {

    return res.status(400).send('Not valid JSON');
  }


  return res.status(201).send('Created');
});

app.get('/pdfs', (req, res) => {
  ejs.renderFile(`${__dirname}/template.ejs`, dummyInvoice, (err, str) => {
    if (err) throw err;

    return res.send(str);
  });
});

app.listen(port, () => {
  console.log('listening on port', port);
});

module.exports = app;
