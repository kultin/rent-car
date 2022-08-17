const {  Car, Like } = require('../db/models');


// exports.getAllLikes = async (req, res) => {
//   try {
//     const likes = await Like.findAll({ raw: true });
//     console.log(likes)
//   } catch (error) {
//     console.log('Get Booking DB Err ', error.message);
//     res.status(201)
//   }
// };


exports.addLike = async (req, res) => {
  console.log('add hello')

  const id = req.session?.user?.id;

  console.log('add id: ', id);

  const carId = req.params.id;

  console.log('add carId: ', carId);
  // const likeId = req.params.id
  // console.log(likeId)
  // try {
  //   const likeExists = await Like.findOne({ where: { car_id: carId, user_id: id } });
  //   if (likeExists) res.json("You can't like it twice")
  //   if (!likeExists) {
  //     await Like.create({ car_id: carId, user_id: id })
  //     await Car.increment('likes', { by: 1 });

  //     res.sendStatus(200);
  //   }
  // } catch (err) {
  //   res.json(err.message)
  // }
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
  console.log('delete id: ', id);
  const carId = req.params.id;
  console.log('delete carId: ', carId);
  try {
    await Like.destroy({ where: { car_id: carId, user_id: id } })
    await Car.decrement('likes', { by: 1 });
    res.sendStatus(200);
  } catch (err) {
    res.json(err.message)
  }
};
