const { Message } = require('../db/models');
const { Booking } = require('../db/models');


const { User } = require('../db/models');
const { Car } = require('../db/models');



exports.getMessages = async (req, res) => {
  const { id } = req.body
  console.log(id)
  try {
    const messages = await Message.findAll({
      where: { booking_id: id },
      include:
      {
        model: User,
        as: 'sender',
        attributes: ['name'],
      },
    })
    
    const sortedMessages = messages.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));

    res.status(200).json(sortedMessages);
  } catch (error) {
    console.log('Get Messages DB Err ', error.message);
    res.status(400).json(['Get Messages DB Err']);
  }
};


exports.sendMessage = async (req, res) => {
  const { id, text } = req.body.values

  try {
    const booking = await Booking.findOne({
      raw: true,
      where: { id },
      include:
      {
        model: Car,
        attributes: ['user_id'],
      },
    });

    if (req.session.user.role == 'lessee') {
      const newMessage = await Message.create({
        recipient_id: booking['Car.user_id'],
        sender_id: req.session.user.id,
        text,
        status: false,
        booking_id: id
      })
    } 
    if (req.session.user.role == 'lessor') {
      const newMessage = await Message.create({
        recipient_id: booking.user_id,
        sender_id: req.session.user.id,
        text,
        status: false,
        booking_id: id
      })
    } 

    res.sendStatus(200)
  } catch (error) {
    console.log('Send Message DB Err ', error.message);
    res.status(400).json('Send Message DB Err');
  }
};


exports.readMessages = async (req, res) => {
  const { id } = req.body.id

  try {
    const updateMessages = await Message.update(
      {
        status: true,
      },
      {
        where: { recipient_id: req.session.user.id }
      })

    res.sendStatus(200)

  } catch (error) {
    console.log('READ Message DB Err ', error.message);
    res.status(400).json('READ Message DB Err');
  }
};
