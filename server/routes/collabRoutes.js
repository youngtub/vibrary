const db = require('../db');
const Sequelize = require('sequelize');
const inthestudio = db.inthestudio;
const Collab = require('../db/models/collabModel.js');

exports.addCollab = (req, res) => {
  var newCollab = Collab.create({
    title: ''
  })
  .then((collab) => {
    res.send(JSON.stringify(collab))
  })
};
