const express = require('express');

const timezoneController = require("../controllers/timezoneController.js");

const router = express.Router();

//CREATE
router.post('/', timezoneController.addTimezone, (req, res) => {
  res.status(200).json(res.locals.timezone);
});

//READ
router.get('/', timezoneController.getTimezones, (req, res) => {
  res.status(200).json(res.locals.timezone);
});

//UPDATE
router.patch('/', timezoneController.updateTimezone, (req, res) => {
  res.status(200).json(res.locals.timezone);
});

//DELETE
router.get('/', timezoneController.deleteTimezone, (req, res) => {
  res.status(200).json(res.locals.timezone);
});

module.exports = router;
