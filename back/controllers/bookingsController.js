const { Booking } = require('../db/models');
const { User } = require('../db/models');
const { Car } = require('../db/models');

exports.getCarBookings = async (req, res) => {
  const { id } = req.params
  try {
    const bookings = await Booking.findAll({})
    console.log(bookings)
    res.status(200).json(bookings);
  } catch (error) {
    console.log('Get Bookings DB Err ', error.message);
    res.status(201)
  }
}

exports.getAllBookings = async (req, res) => {
  const id = req.session?.user?.id;
  console.log(req.session.user.role);
  if (id === undefined) { return res.sendStatus(201) }
  try {
    const user = await User.findOne({ where: { id } })
    if (user.role == 'lessee') {
      const bookings = await Booking.findAll({
        raw: true,
        where: { user_id: id },
        include:
        {
          model: Car,
          attributes: ['brand', 'model'],
        },
      });
      res.status(200).json(bookings);
    }
    if (user.role == 'lessor') {
      const cars = await Car.findAll({ raw: true, where: { user_id: id } })
      const bookings = []
      for (let i = 0; i < cars.length; i++) {
        let booking = await Booking.findAll({
          raw: true,
          where: { CarId: cars[i].id },
          include:
          {
            model: Car,
            attributes: ['brand', 'model'],
          },
        })
        for (let p = 0; p < booking.length; p++) {
          bookings.push(booking[p])
        }
      }
      console.log('Test get', bookings);
      res.json(bookings)
    }
  } catch (error) {
    console.log('Get Booking DB Err ', error.message);
    res.status(201)
  }
};

exports.createBooking = async (req, res) => {
  const id = req.session?.user?.id;
  console.log(req.body)
  const { start, finish, location, carId, days, price, tentId } = req.body
  try {
    const booking = {
      date_start: start,
      date_end: finish,
      days,
      price,
      pick_up: location,
      return_place: location,
      CarId: carId,
      user_id: id,
      tent_id: tentId,
      status: 'pre-booking',
    };

    const test = await Booking.create(booking)
    console.log('TESTcreate2', test);
    res.status(200).json(booking);
  } catch (error) {
    console.log('create Booking DB Err ', error.message);
    res.status(400).json('create Booking DB Err');
  }
};

exports.applyBooking = async (req, res) => {
  const { id } = req.body;

  try {
    const applyBooking = await Booking.update(
      {
        status: 'booked',
      },
      {
        where: { id }
      })

    res.status(200);
  } catch (error) {
    console.log('Apply Booking DB Err ', error.message);
    res.status(201)
  }
};

