const express = require('express');
const { model } = require('mongoose');

const teamController = require("../controllers/teamController.js");

const teamRouter = express.Router();

//UPDATE
teamRouter.patch('/*', teamController.updateTeam, (req, res) => {
  res.status(200).json(res.locals.timezone);
});

module.exports = teamRouter;
