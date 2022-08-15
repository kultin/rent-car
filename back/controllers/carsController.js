const { Car, Image, Tent } = require('../db/models');

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll({
      // include: { model: Image },
      include: [{ model: Image }, { model: Tent }],
    });
    // console.log('test', cars.Tents);
    res.status(200).json(cars);
  } catch (error) {
    console.log('Get All Cars DB Err', error.message);
    res.status(400).json('Get All Cars DB Err');
  }
};

exports.getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findAll({
      raw: true,
      where: { id },
    });
    res.status(200).json(car);
  } catch (error) {
    console.log('Get Car DB Err ', error.message);
    res.status(400).json('Get Car DB Err');
  }
};

exports.getLessorCars = async (req, res) => {
  const id = req.session?.user?.id;
  try {
    const cars = await Car.findAll({
      raw: true,
      where: { user_id: id },
    });
    res.status(200).json(cars);
  } catch (error) {
    console.log('Get Lessor Car DB Err ', error.message);
    res.status(400).json('Get Lessor Car DB Err');
  }
};
