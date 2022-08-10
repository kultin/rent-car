const { Booking } = require('../db/models');

exports.getAllBookings = async (req, res) => {
  const id = req.session?.user?.id;
  try {
    const bookings = await Booking.findAll({
      raw: true,
      where: { user_id: id },
    });
    res.status(200).json(bookings);
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

