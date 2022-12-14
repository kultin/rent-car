const bcrypt = require('bcrypt');
const { User } = require('../db/models');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await User.findOne({ where: { email } });
    if (!user) return res.sendStatus(201);

    const isValidPassword = await bcrypt.compare(password, user.password); // сравниваем пароли
    if (!isValidPassword) return res.sendStatus(201);

    req.session.user = { id: user.id, name: user.name, role: user.role };
    
console.log(req.session.user);

    res.json(user)

  } catch (error) {
    console.log('Login User Error ', error.message);
  }
};