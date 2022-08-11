const { Booking } = require('../db/models');
const { User } = require('../db/models');
const { Car } = require('../db/models');

exports.getAllBookings = async (req, res) => {
  const id = req.session?.user?.id;

  const user = await User.findOne({ where: { id } })
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  try {
    if (user.role == 'lessee') {
      const bookings = await Booking.findAll({
        raw: true,
        where: { user_id: id },
      });
      res.status(200).json(bookings);
    }
    if (user.role == 'lessor') {

      const cars = await Car.findAll({ raw: true, where: { user_id: id } })
      let bookings = []

      for (let i = 0; i < cars.length; i++) {
        let booking = await Booking.findAll({
          raw: true,
          where: { car_id: cars[i].id },
        })
        for (let p = 0; p < booking.length; p++) {
          bookings.push(booking[p])
        }
      }

      console.log(bookings);
      res.json(bookings)
    }
  } catch (error) {
    console.log('Get Booking DB Err ', error.message);
    res.status(400).json('Get Booking DB Err');
  }
};

exports.createBooking = async (req, res) => {
  const id = req.session?.user?.id;
  console.log(req.body)
  const {start,finish,location,carId}=req.body
  try {
    const booking = {
      date_start: start,
      date_end: finish,
      pick_up: location,
      return_place: location,
      car_id: carId,
      user_id: id,
      closed: false,
    };
    console.log(booking);
    //await Booking.create(booking)
    res.status(200).json(booking);
  } catch (error) {
    console.log('Get Booking DB Err ', error.message);
    res.status(400).json('Get Booking DB Err');
  }
};

