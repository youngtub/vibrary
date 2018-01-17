const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const router = require('./server/router.js')

const app = express();

app.use(bodyParser.json({ limit: '50mb'} ));
app.use(compression())
app.use(express.static(__dirname + '/ui'));

const PORT = process.env.PORT || 3000;

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/ui/index.html');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
