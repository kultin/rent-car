const { User } = require('../db/models');

exports.getuser = async (req, res) => {
  try {
    console.log(req.session.user);
    if (req.session === undefined) { res.sendStatus(401) }

    const user = await User.findOne({ where: { id: req.session.user.id } })
    res.json({
      name: user.name,
      email: user.email,
      tel: user.tel,
      img_url: user.img_url,
      role: user.role,
    })

  } catch (error) {
    console.log('Login User Error ', error.message);
  }
};