const db = require('../db');
const Sequelize = require('sequelize');
const inthestudio = db.inthestudio;
const Album = require('../db/models/albumModel.js');

exports.addAlbum = (req, res) => {
  var newAlbum = Album.create({
    title: ''
  })
  .then((album) => {
    res.send(JSON.stringify(album))
  })
};
