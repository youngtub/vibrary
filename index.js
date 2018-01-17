const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const router = require('./server/router.js');
const schema = require('./server/graphql.js');
const graphqlHTTP = require('express-graphql');
const { maskErrors } = require('graphql-errors');

const app = express();

app.use(bodyParser.json({ limit: '50mb'} ));
app.use(compression())
app.use(express.static(__dirname + '/ui'));

const PORT = process.env.PORT || 3000;

app.use('/api', router)

maskErrors(schema)
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/ui/index.html');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
