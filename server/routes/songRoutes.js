const db = require('../db');
const Sequelize = require('sequelize');
const inthestudio = db.inthestudio;
const Song = require('../db/models/songModel.js');
const Section = require('../db/models/sectionModel.js');
const Segment = require('../db/models/segmentModel.js');

exports.addSong = (req, res) => {
  var newSong = Song.create({
    title: ''
  })
  .then((song) => {
    res.send(JSON.stringify(song))
  })
};
