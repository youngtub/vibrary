const Sequelize = require('sequelize');
const inthestudio = require('../../db').inthestudio;

const Album = inthestudio.define('album', {
  name: Sequelize.STRING,
  date: Sequelize.DATE,
  wiki: Sequelize.STRING,
  artists: Sequelize.ARRAY(Sequelize.STRING),
  spid: Sequelize.STRING
});

Album.sync({force: false});

module.exports = Album;
