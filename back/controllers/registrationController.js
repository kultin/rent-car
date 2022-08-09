const { User } = require('../db/models');
const bcrypt = require('bcrypt');

exports.registration = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      name,
      email,
      tel: 79997777771,
      password: hashedPassword,
      img_url: '/img.png',
      role: null,
    });

    req.session.user = { id: user.id, name: user.name };

    res.json({
      name,
      email,
      tel: 79997777771,
      img_url: '/img.png',
      role: null,
    })

  } catch (error) {
    console.log('Login User Error ', error.message);
  }
};