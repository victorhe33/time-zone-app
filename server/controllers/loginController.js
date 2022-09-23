const { Timezone } = require('../models/timezoneModels');

const loginController = {};

//UPDATE
loginController.checkUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username,password);
      // console.log('updateTeam', team)
      // const filter = { _id: req.params[0] };
      // const update = { team: team }
      // const timezone = await Timezone.findOneAndUpdate(filter, update, { new: true });
      if (username === 'admin' && password === 'password') {
        res.locals.status = true;
      } else {
        res.locals.status = false;
      }
    return next();
  } catch (err) {
    return next({
      log: 'loginController.checkUser query error',
      message: { err: 'An error occurred' }
    });
  }
}

module.exports = loginController;