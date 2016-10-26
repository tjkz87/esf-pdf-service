const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const config = require('./env/config');
const fs = require('fs');

const app = express();
const port = config.server.port;
let dummyInvoice = null;
let template = null;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/pdfs', (req, res) => {
  if (!req.body.invoices) {

    return res.status(400).send(config.messages.invalid_json);
  }

  return res.status(201).send('Created');
});

app.get('/pdfs', (req, res) => {
  res.send(ejs.render(template, dummyInvoice));
});

fs.readFile('./dummy_data/invoice.json', 'utf8', (err, data) => {
  if (err) throw err;
  dummyInvoice = JSON.parse(data);
  dummyInvoice.invoice.consignor = dummyInvoice.invoice.consignor || {};
  dummyInvoice.invoice.consignee = dummyInvoice.invoice.consignee || {};
  dummyInvoice.invoice.deliveryTerm = dummyInvoice.invoice.deliveryTerm || {};
  console.log('Dummy invoice loaded');
});

fs.readFile(`${__dirname}/templates/esf.ejs`, 'utf8', (err, data) => {
  if (err) throw err;
  template = data;
  console.log('Template loaded');

  app.listen(port, () => {
    console.log('listening on port', port);
  });
});


module.exports = app;
