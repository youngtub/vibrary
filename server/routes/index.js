const express = require('express');
const router = express.Router();
const db = require('../db');
const Sequelize = require('sequelize');
const axios = require('axios');
const songRoutes = require('./songRoutes.js');
const artistRoutes = require('./artistRoutes.js');
const albumRoutes = require('./albumRoutes.js');
const collabRoutes = require('./collabRoutes.js');

router.post('/newSong', songRoutes.addSong);

router.get('/allSongs', songRoutes.allSongs);

router.get('/autocomplete', songRoutes.autocomplete)

router.get('/similarVibe', songRoutes.similarVibePCA);

router.get('/explore_all', songRoutes.exploreAll)

router.get('/explore_song', songRoutes.exploreSong)

module.exports = router;
