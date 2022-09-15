const { Timezone } = require('../models/timezoneModels');

const timezoneController = {};

timezoneController.getTimezones = async (req, res, next) => {
  // const timezone = {time: "zone"};
  const timezone = await Timezone.find();
  res.locals.timezone = timezone;  
  next();
}

timezoneController.addTimezone = async (req, res, next) => {
  // const timezone = {time: "zone"};
  const { name } = req.body;
  console.log(name);
  const timezone = await Timezone.create({
    name: name,
  });
  res.locals.timezone = timezone;
  next();
}

module.exports = timezoneController;