const express = require('express');

const timezoneController = require("../controllers/timezoneController.js");

const router = express.Router();

router.get('/', timezoneController.getTimezones, (req, res) => {
  res.status(200).json(res.locals.timezone)
})

router.post('/', timezoneController.addTimezone, (req, res) => {
  res.status(200).json(res.locals.timezone)
})

module.exports = router;
