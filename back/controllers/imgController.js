const { User } = require('../db/models');

const Error = (res, err) => res.status(401).json({ err });

exports.uploadAvatar = async (req, res) => {
  try {
    // записать path в базу нужен id
    if (req.file) {
      await User.create({
        img_url: req.file.path,
      });
    }
    res.json(req.file);
  } catch (error) {
    console.log('DB Upload URL Error:', error.message);
    Error(res, error.message);
  }
};
