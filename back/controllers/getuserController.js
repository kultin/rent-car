const { User } = require('../db/models');

exports.getuser = async (req, res) => {
  try {
    if (req.session === undefined) { res.sendStatus(401) }

    const user = await User.findOne({ where: { id: req.session.user.id } })
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      tel: user.tel,
      img_url: user.img_url,
      role: user.role,
    })

  } catch (error) {
    console.log('Login User Error ', error.message);
    res.sendStatus(404)
  }
};