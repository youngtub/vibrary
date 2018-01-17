const express = require('express');
const router = require('express').Router();
const axios = require('axios');
const dbRoutes = require('./routes');

router.use('/db', dbRoutes);

router.get('/autocomplete', (req, res) => {
  var q = req.query.q.replace(/ /g, '%20');
  var str = `query%20%7B%0A%20%20autocomplete(q%3A%20%22${q}%22)%20%7B%0A%20%20%20%20title%0A%20%20%20%20id%0A%20%20%20%20attr%0A%20%20%20%20artists%0A%20%20%7D%0A%7D`
  res.redirect(`/graphql?query=${str}`)
});

router.get('/songLookup', (req, res) => {
  var id = req.query.id;
  var q = `query%20%7B%0A%20%20song(id%3A%22${id}%22)%20%7B%0A%20%20%20%20title%0A%20%20%20%20id%0A%20%20%20%20album%0A%20%20%20%20albumId%0A%20%20%20%20audioFeatures%20%7B%0A%20%20%20%20%20%20danceability%0A%20%20%20%20%20%20energy%0A%20%20%20%20%20%20loudness%0A%20%20%20%20%20%20key%0A%20%20%20%20%20%20mode%0A%20%20%20%20%20%20speechiness%0A%20%20%20%20%20%20acousticness%0A%20%20%20%20%20%20instrumentalness%0A%20%20%20%20%20%20liveness%0A%20%20%20%20%20%20valence%0A%20%20%20%20%20%20tempo%0A%20%20%20%20%20%20duration%0A%20%20%20%20%20%20timeSignature%0A%20%20%20%20%7D%0A%20%20%20%20audioAnalysis%20%7B%0A%20%20%20%20%20%20duration%0A%20%20%20%20%20%20endOfFadeIn%0A%20%20%20%20%20%20startOfFadeOut%0A%20%20%20%20%20%20loudness%0A%20%20%20%20%20%20tempo%0A%20%20%20%20%20%20key%0A%20%20%20%20%20%20mode%0A%20%20%20%20%20%20bars%20%7B%0A%20%20%20%20%20%20%20%20start%0A%20%20%20%20%20%20%20%20duration%0A%20%20%20%20%20%20%20%20confidence%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20sections%20%7B%0A%20%20%20%20%20%20%20%20start%0A%20%20%20%20%20%20%20%20duration%0A%20%20%20%20%20%20%20%20confidence%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20segments%20%7B%0A%20%20%20%20%20%20%20%20start%0A%20%20%20%20%20%20%20%20duration%0A%20%20%20%20%20%20%20%20confidence%0A%20%20%20%20%20%20%20%20pitches%0A%20%20%20%20%20%20%20%20timbre%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D`
  res.redirect(`/graphql?query=${q}`)
});

module.exports = router;
