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

router.get('/similarVibe', songRoutes.similarVibe)

module.exports = router;
