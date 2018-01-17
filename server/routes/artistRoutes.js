const db = require('../db');
const Sequelize = require('sequelize');
const inthestudio = db.inthestudio;
const Artist = require('../db/models/artistModel.js');

exports.addArtist = (req, res) => {
  var newArtist = Artist.create({
    title: ''
  })
  .then((artist) => {
    res.send(JSON.stringify(artist))
  })
};
