const { User } = require('../db/models');

exports.login = async (req, res) => {
  
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.sendStatus(404);
    if (user.password == req.body.password) {
      req.session.user = { id: user.id, name: user.name };
      res.json(user)
    }
    // const isValidPassword = await bcrypt.compare(password, user.password); // сравниваем пароли
    // if (!isValidPassword) return res.json({ name: false });



  } catch (error) {
    console.log('Login User Error ', error.message);
  }
};