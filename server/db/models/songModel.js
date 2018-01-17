const Sequelize = require('sequelize');
const inthestudio = require('../../db').inthestudio;

const Song = inthestudio.define('song', {
  title: Sequelize.STRING,
  vocals: Sequelize.ARRAY(Sequelize.INTEGER),
  producers: Sequelize.ARRAY(Sequelize.INTEGER),
  engineers: Sequelize.ARRAY(Sequelize.INTEGER),
  artists: Sequelize.ARRAY(Sequelize.STRING),
  released: Sequelize.DATE,
  genre: Sequelize.STRING,
  albumId: {type: Sequelize.STRING, default: 0},
  albumName: {type: Sequelize.STRING, default: 'single'},
  vibe: Sequelize.ARRAY(Sequelize.FLOAT)
});

Song.sync({force: false});

module.exports = Song;
