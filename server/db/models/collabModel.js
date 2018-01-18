const Sequelize = require('sequelize');
const inthestudio = require('../../db').inthestudio;
const Song = require('./songModel.js');
const Artist = require('./artistModel.js');

const Collab = inthestudio.define('collab', {

});

Collab.belongsTo(Song);
Collab.belongsTo(Artist);

Collab.sync({force: false});

module.exports = Collab;
