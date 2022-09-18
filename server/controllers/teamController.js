const { Timezone } = require('../models/timezoneModels');

const teamController = {};

//UPDATE
teamController.updateTeam = async (req, res, next) => {
  try {
    const { team } = req.body;
    console.log('updateTeam', team)
    const filter = { _id: req.params[0] };
    const update = { team: team }
    const timezone = await Timezone.findOneAndUpdate(filter, update, { new: true });
    res.locals.timezone = timezone;
    return next();
  } catch (err) {
    return next({
      log: 'teamController.updateTeam query error',
      message: { err: 'An error occurred' }
    });
  }
}

module.exports = teamController;