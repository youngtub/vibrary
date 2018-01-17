const Sequelize = require('sequelize');
const inthestudio = require('../../db').inthestudio;
const Song = require('./songModel.js');
const Section = require('./sectionModel.js');

const Segment = inthestudio.define('segment', {
  start: Sequelize.FLOAT,
  end: Sequelize.FLOAT,
  duration: Sequelize.FLOAT,
  timbre: Sequelize.ARRAY(Sequelize.FLOAT),
  pitches: Sequelize.ARRAY(Sequelize.FLOAT),
  loudness_start: Sequelize.FLOAT,
  loudness_max: Sequelize.FLOAT
});

Segment.belongsTo(Section)

Segment.sync({force: false});

module.exports = Segment;
