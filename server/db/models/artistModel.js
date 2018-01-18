const Sequelize = require('sequelize');
const inthestudio = require('../../db').inthestudio;

const Artist = inthestudio.define('artist', {
  name: Sequelize.STRING,
  role: Sequelize.STRING,
  age: Sequelize.INTEGER,
  yearsActive: Sequelize.ARRAY(Sequelize.INTEGER),
  wiki: Sequelize.STRING,
  rgid: Sequelize.STRING
});

Artist.sync({force: false});

module.exports = Artist;
