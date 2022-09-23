const express = require('express');
const { model } = require('mongoose');

const loginController = require("../controllers/loginController.js");

const loginRouter = express.Router();

//UPDATE
loginRouter.post('/', loginController.checkUser, (req, res) => {
  // console.log(req.body);
  res.status(200).json(res.locals.status);
});

module.exports = loginRouter;
