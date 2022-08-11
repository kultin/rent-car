const bcrypt = require('bcrypt');

const { User } = require('../db/models');


exports.registration = async (req, res) => {
  const { name, email, password, tel } = req.body;
  let { role } = req.body

  console.log(role);

  if (role == 'true') {
    role = 'lessor'
  }
  if (role == 'false') {
    role = 'lessee'
  }
  const checkUser = await User.findOne({ where: { email } })


  try {
    if (checkUser == undefined) {
      const hashedPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        name,
        email,
        tel,
        password: hashedPassword,
        img_url: null,
        role,
      });

      req.session.user = { id: user.id, name: user.name };

      res.json({
        name,
        email,
        tel,
        img_url: null,
        role,
      })
    } else {
      res.sendStatus(409)
    }

  } catch (error) {
    console.log('Login User Error ', error.message);
  }
};
