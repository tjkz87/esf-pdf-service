const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log(req.method, 'on', req.url);

  res.send('Hello world!');
})

app.listen(port, () => {
  console.log('listening on port', port);
});
