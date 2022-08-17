const { Car, Like } = require('../db/models');


exports.addLike = async (req, res) => {
  const id = req.session?.user?.id;
  const carId = req.params.id;
  try {
    await Like.create({ car_id: carId, user_id: id })
    await Car.increment('likes', { by: 1 });
    res.sendStatus(200);
  } catch (err) {
    res.json(err.message)
  }
};

exports.deleteLike = async (req, res) => {
  const id = req.session?.user?.id;
  const carId = req.params.id;

  try {
    const like = await Like.findOne({ where: { car_id: carId, user_id: id } });
    await Like.destroy({ where: { car_id: carId, user_id: id } })
    await Car.decrement('likes', { by: 1 });
    res.status(200).json(like);
  } catch (err) {
    res.json(err.message)
  }
};

exports.getLikes = async (req, res) => {
  try {
    const likes = await Like.findAll();
    res.status(200).json(likes);
  } catch (err) {
    res.json(err.message)
  }
};

exports.getUserLikes = async (req, res) => {
  const id = req.session?.user?.id;
  try {
    const likes = await Like.findAll({where: {user_id: id}});
    res.status(200).json(likes);
  } catch (err) {
    res.json(err.message)
  }
};

