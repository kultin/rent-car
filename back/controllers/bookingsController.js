const { Booking } = require('../db/models');
const { User } = require('../db/models');
const { Car } = require('../db/models');
const booking = require('../db/models/booking');

exports.getAllBookings = async (req, res) => {
  const id = req.session?.user?.id;
  console.log(id);
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
          where: { car_id: cars[i].id },
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

      res.json(bookings)
    }
  } catch (error) {
    console.log('Get Booking DB Err ', error.message);
    res.status(201)
  }
};

exports.createBooking = async (req, res) => {
  const id = req.session?.user?.id;
  console.log(id)
  const { start, finish, location, carId, days, price } = req.body
  try {
    const booking = {
      date_start: start,
      date_end: finish,
      days,
      price,
      pick_up: location,
      return_place: location,
      car_id: carId,
      user_id: id,
      status: 'pre-booking',
    };
    const test = await Booking.create(booking)

    res.status(200);
  } catch (error) {
    console.log('Get Booking DB Err ', error.message);
    res.status(400).json('Get Booking DB Err');
  }
};

exports.applyBooking = async (req, res) => {
  const id = req.body.id;
  console.log(id)

  try {
    const applyBooking = await Booking.update(
      {
        status: 'booked',
      },
      {
        where: { id: req.body.id }
      })

    res.status(200);
  } catch (error) {
    console.log('Apply Booking DB Err ', error.message);
    res.status(400).json('Apply Booking DB Err');
  }
};