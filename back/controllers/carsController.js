const {
  Car, Image, Tent, Like, CarTent
} = require('../db/models');

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll({
      include: [{ model: Image }, { model: Tent }, { model: Like }],
    });
    console.log('car.Tents.length', cars.map((car)=> car.Tents.length))

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

exports.uploadNewCar = async (req, res) => {
  const userId = req.session?.user?.id;

  if (userId) {
    try {
      const newCar = await Car.create({
        brand: req.body.brand,
        model: req.body.model,
        body: req.body.body,
        year: Number(req.body.year),
        engine: req.body.engine,
        gear: req.body.gear,
        power: req.body.power,
        seats: req.body.seats,
        photo: req.files[0].path.substr(6),
        price: Number(req.body.price),
        capacity: Number(req.body.capacity),
        likes: 0,
        location: req.body.coordinates,
        user_id: userId,
      });
      if (newCar.id) {
        try {
          for (let i = 0; i < req.files.length; i++) {
            await Image.create({
              car_id: newCar.id,
              img_url: req.files[i].path.substr(6),
            });
          }
            await CarTent.create({
              car_id: newCar.id,
              tent_id: 1,
            })
            await CarTent.create({
              car_id: newCar.id,
              tent_id: 2,
            })
            await CarTent.create({
              car_id: newCar.id,
              tent_id: 3,
            })
            await CarTent.create({
              car_id: newCar.id,
              tent_id: 4,
            })
          
          // await Tent.create({
          //   name: 'Mini',
          //   price: 1000,
          //   capacity: 2,
          //   img_url: '/mini.png',
          // });
          // await Tent.create({
          //   name: 'Medium',
          //   price: 2000,
          //   capacity: 3,
          //   img_url: '/medium.png',
          // });
          // await Tent.create({
          //   name: 'Large',
          //   price: 3000,
          //   capacity: 4,
          //   img_url: '/large.png',
          // });
          // await Tent.create({
          //   name: 'XL',
          //   price: 4000,
          //   capacity: 5,
          //   img_url: '/xl.png',
          // });
          res.status(200).json('ImagesLoaded');
        } catch (error) {
          console.log('DB Upload URL Error:', error.message);
          Error(res, error.message);
        }
      } else {
        console.log('No CarID err');
        Error(res, 'No CarID err');
      }
    } catch (error) {
      console.log('Create Car DB Err', error.message);
      Error(res, error.message);
    }
  } else {
    console.log('Session id err');
    Error(res, 'Session id err');
  }
};

exports.editCar = async (req, res) => {
  const userId = req.session?.user?.id;
  console.log('EDIT CAR', req.body);
  console.log('EDIT CAR', req.files);

  if (userId) {
    try {
      await Car.update({
        brand: req.body.brand,
        model: req.body.model,
        body: req.body.body,
        year: Number(req.body.year),
        engine: req.body.engine,
        gear: req.body.gear,
        power: req.body.power,
        seats: req.body.seats,
        photo: req.files[0].path.substr(6),
        price: Number(req.body.price),
        capacity: Number(req.body.capacity),
        location: req.body.coordinates,
      }, { where: { id: req.body.id } });
      try {
        for (let i = 0; i < req.files.length; i++) {
          await Image.update({
            img_url: req.files[i].path.substr(6),
          }, { where: { car_id: req.body.id } });
        }
        res.status(200).json('ImagesLoaded');
      } catch (error) {
        console.log('DB Upload URL Error:', error.message);
        Error(res, error.message);
      }
    } catch (error) {
      console.log('Create Car DB Err', error.message);
      Error(res, error.message);
    }
  } else {
    console.log('Session id err');
    Error(res, 'Session id err');
  }
};
