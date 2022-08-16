const { User, Image, Car } = require('../db/models');

const Error = (res, err) => res.status(401).json({ err });

exports.uploadAvatar = async (req, res) => {
  const id = req.session?.user?.id;
  if (id) {
    try {
      if (req.file) {
        await User.update(
          { img_url: req.file.path.substr(6) },
          { where: { id } },
        );
      }
      res.json(req.file);
    } catch (error) {
      console.log('DB Upload URL Error:', error.message);
      Error(res, error.message);
    }
  } else {
    console.log('Session id err');
    Error(res, 'Session id err');
  }
};
