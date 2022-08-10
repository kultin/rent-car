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
