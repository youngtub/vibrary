const Sequelize = require('sequelize');
const inthestudio = require('../../db').inthestudio;

const Collab = inthestudio.define('collab', {
  sourceID: Sequelize.INTEGER,
  sourceName: Sequelize.STRING,
  targetID: Sequelize.INTEGER,
  targetName: Sequelize.STRING,
  songList: Sequelize.ARRAY(Sequelize.INTEGER)
});

Collab.sync({force: false});

module.exports = Collab;
