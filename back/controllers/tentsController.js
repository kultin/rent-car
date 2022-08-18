const { Tent } = require('../db/models');

exports.getAllTents = async (req, res) => {
  try {
    const tents = await Tent.findAll({ raw: true });
    res.status(200).json(tents);
  } catch (error) {
    console.log('Get All Tents DB Err', error.message);
    res.status(400).json('Get All Tents DB Err');
  }
};
