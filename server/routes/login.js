const express = require('express');
const { model } = require('mongoose');

const loginController = require("../controllers/loginController.js");

const loginRouter = express.Router();

//CREATE
loginRouter.post('/', loginController.createUser, (req, res) => {
  // console.log(req.body);
  res.status(200).json(res.locals);
});

//READ
loginRouter.patch('/', loginController.verifyUser, (req, res) => {
  // console.log(req.body);
  res.status(200).json(res.locals);
});

module.exports = loginRouter;
