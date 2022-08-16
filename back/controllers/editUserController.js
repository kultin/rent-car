const { User } = require('../db/models');

exports.editUser = async (req, res) => {
  try {
    const user = User.update(
      {
        name: req.body.name,
        tel: req.body.tel,
      },
      {
        where: { id: req.body.id }
      })


    res.json(user);
  } catch (error) {
    console.log('Edit User Error ', error.message);
  }
};
