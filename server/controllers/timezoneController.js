const { Timezone } = require('../models/timezoneModels');

const timezoneController = {};

//CREATE
timezoneController.addTimezone = async (req, res, next) => {
  try {
    const { name } = req.body;
    const timezone = await Timezone.create({
      name: name,
    });
    res.locals.timezone = timezone;
    return next();
  } catch (err) {
    return next({
      log: 'timezoneController.addTimezone query error',
      message: { err: 'An error occurred' }
    });
  }
}

//READ
timezoneController.getTimezones = async (req, res, next) => {
  try {
    const timezone = await Timezone.find();
    res.locals.timezone = timezone;  
    return next();
  } catch (err){
    return next({
      log: 'timezoneController.getTimezones query error',
      message: { err: 'An error occurred' }
    });
  }
}

//UPDATE
timezoneController.updateTimezone = async (req, res, next) => {
  try {
    const { name } = req.body;
    const filter = { name: "Victor" }
    const update = { name: name }
    const timezone = await Timezone.findOneAndUpdate(filter, update, { new: true });
    res.locals.timezone = timezone;
    return next();
  } catch (err) {
    return next({
      log: 'timezoneController.updateTimezone query error',
      message: { err: 'An error occurred' }
    });
  }
}

//DELETE
timezoneController.deleteTimezone = async (req, res, next) => {
  try {
    const deleteFilter = { name: req.params[0]}
    console.log(deleteFilter)
    const timezone = await Timezone.findOneAndDelete(deleteFilter);
    res.locals.timezone = timezone;
    return next();
  } catch (err) {
    return next({
      log: 'timezoneController.deleteTimezone query error',
      message: { err: 'An error occurred' }
    });
  }
}

module.exports = timezoneController;