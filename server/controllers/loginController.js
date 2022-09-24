const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const loginController = {};

//CREATE
loginController.createUser = async (req, res, next) => {
  // write code here
  const { username, password } = req.body;
  if (!username || !password) {
    // next({ERROR: 'bullshit format'});
    return next({ ERROR: 'bullshit format' });
  }

  if (typeof username !== 'string' || typeof password !== 'string') {
    return next({ ERROR: 'bullshit value type' });
    /*res.redirect('/signup');*/
  }

  const newUser = await User.create(req.body);
  // const id = await jwt.sign({ username }, process.env.SECRET_SESSION);
  res.locals.status = newUser;
  // console.log('jwt: ', id);
  return next();
};

//READ
loginController.verifyUser = async (req, res, next) => {
  const user = await User.find({ username: req.body.username });
  console.log('user', user)
  if (user.length) {
    const userpwd = user[0].password;
    const isValidPW = await bcrypt.compare(req.body.password, userpwd);
    console.log('isValid', isValidPW);
    res.locals.status = isValidPW;
    return next();
  }
  return next();
};

//UPDATE
// loginController.createUser = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     console.log(username,password);
//       // console.log('updateTeam', team)
//       // const filter = { _id: req.params[0] };
//       // const update = { team: team }
//       // const timezone = await Timezone.findOneAndUpdate(filter, update, { new: true });
//       if (username === 'admin' && password === 'password') {
//         res.locals.status = true;
//       } else {
//         res.locals.status = false;
//       }
//     return next();
//   } catch (err) {
//     return next({
//       log: 'loginController.checkUser query error',
//       message: { err: 'An error occurred' }
//     });
//   }
// }

module.exports = loginController;