const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const config = require('./env/config');
const fs = require('fs');
const phantom = require('phantom');

const app = express();
const port = config.server.port;
let dummyInvoice = null;
let template = null;
let phInstance = null;
let sitepage = null;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/pdfs', (req, res) => {
  if (!req.body.invoices) {

    return res.status(400).send(config.messages.invalid_json);
  }
  const data = req.body.invoices[0];

  sitepage.property('content', ejs.render(template, data))
    .then(() => sitepage.render('./test.pdf'))
    .then(() => {
      res.status(201).send('Created');
    })
    .catch((err) => {
      console.log(err);
    });

  return null;
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

phantom.create()
  .then((instance) => {
    phInstance = instance;
    console.log('Phantom instance created');

    return instance.createPage();
  })
  .then((page) => {
    sitepage = page;
    console.log('Phantom page created');

    // return Promise.resolve();
  })
  .then(() => {
    fs.readFile(`${__dirname}/templates/esf.ejs`, 'utf8', (err, data) => {
      if (err) throw err;
      template = data;
      console.log('Template loaded');

      app.listen(port, () => {
        console.log('listening on port', port);
        app.emit('appStarted');
      });
    });
  })
  .catch((error) => {
    console.log(error);
    phInstance.exit();
  });

process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
  phInstance.exit();
});

module.exports = app;
