const { User, Car, Like } = require('../db/models');



exports.getAllLikes = async (req, res) => {


  try {
    const likes = await Like.findAll({ raw: true });
    console.log(likes)

  } catch (error) {
    console.log('Get Booking DB Err ', error.message);
    res.status(201)
  }
};


exports.addLike = async (req, res) => {
  const id = req.session?.user?.id;
  const carId = req.body.carId;
  try {
    const likeExists =await Like.findOne({where:{car_id:carId, user_id: id}});
    if (likeExists) res.json("You can't like it twice")
    if (!likeExists) {
      await Like.create ({car_id:carId, user_id: id})
      await Car.increment('likes', { by: 1 });

      res.sendStatus(200);
    }
  } catch (err) {
    res.json(err.message)
  }
};

exports.deleteLike = async (req, res) => {
  const id = req.session?.user?.id;
  const carId= req.body.carId;
  try {         
      await Like.destroy({where:{car_id:carId, user_id: id}})
      await Car.decrement('likes', { by: 1 });
      res.sendStatus(200);    
  } catch (err){
    res.json(err.message)
  }
};
