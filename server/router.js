const express = require('express');
const router = require('express').Router();
const axios = require('axios');
const inthestudioRoutes = require('./routes');

router.use('/inthestudio', inthestudioRoutes);

module.exports = router;
