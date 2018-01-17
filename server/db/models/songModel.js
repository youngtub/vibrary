const Sequelize = require('sequelize');
const inthestudio = require('../../db').inthestudio;

const Song = inthestudio.define('song', {
  title: Sequelize.STRING,
  vocals: Sequelize.ARRAY(Sequelize.INTEGER),
  producers: Sequelize.ARRAY(Sequelize.INTEGER),
  engineers: Sequelize.ARRAY(Sequelize.INTEGER),
  released: Sequelize.DATE,
  genre: Sequelize.STRING,
  albumID: {type: Sequelize.INTEGER, default: 0},
  albumName: {type: Sequelize.STRING, default: 'single'}
});

Song.sync({force: false});

module.exports = Song;
