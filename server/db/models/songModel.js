const Sequelize = require('sequelize');
const inthestudio = require('../../db').inthestudio;

const Song = inthestudio.define('song', {
  title: Sequelize.STRING,
  vocals: Sequelize.ARRAY(Sequelize.STRING),
  producers: Sequelize.ARRAY(Sequelize.STRING),
  engineers: Sequelize.ARRAY(Sequelize.STRING),
  artists: Sequelize.ARRAY(Sequelize.STRING),
  released: Sequelize.DATE,
  genre: Sequelize.STRING,
  albumId: {type: Sequelize.STRING, default: 0},
  albumName: {type: Sequelize.STRING, default: 'single'},
  vibe: Sequelize.ARRAY(Sequelize.FLOAT),
  cutoff: Sequelize.FLOAT,
  key: Sequelize.INTEGER,
  tempo: Sequelize.FLOAT,
  duration: Sequelize.FLOAT,
  spid: Sequelize.STRING,
  thumbnail: Sequelize.STRING,
  yid: Sequelize.STRING,
  rgid: Sequelize.STRING,
  recording_location: Sequelize.STRING
});

Song.sync({force: false});

module.exports = Song;
