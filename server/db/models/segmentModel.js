const Sequelize = require('sequelize');
const inthestudio = require('../../db').inthestudio;
const Song = require('./songModel.js');
const Section = require('./sectionModel.js');

const Segment = inthestudio.define('segment', {
  start: Sequelize.FLOAT,
  duration: Sequelize.FLOAT,
  timbre: Sequelize.ARRAY(Sequelize.FLOAT),
  pitches: Sequelize.ARRAY(Sequelize.FLOAT)
});

Segment.belongsTo(Song)

Segment.sync({force: false});

module.exports = Segment;
