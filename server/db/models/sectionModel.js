const Sequelize = require('sequelize');
const inthestudio = require('../../db').inthestudio;
const Song = require('./songModel.js');

const Section = inthestudio.define('section', {
  start: Sequelize.FLOAT,
  end: Sequelize.FLOAT,
  duration: Sequelize.FLOAT
});

Section.belongsTo(Song)

Section.sync({force: false});

module.exports = Section;
