const { User, Image, Car } = require('../db/models');

const Error = (res, err) => res.status(401).json({ err });

exports.uploadAvatar = async (req, res) => {
  const id = req.session?.user?.id;
  // console.log(req.file)
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

exports.uploadCarPhotos = async (req, res) => {
  const userId = req.session?.user?.id;
  // const carId = req.params.id;

  const carId = 3 // убрать хардкод!!!! нужно выбрать id машины к которой будет привязана фотка


  if (userId) {
    if (carId) {
      try {
        for (let i = 0; i < req.files.length; i++) {
          await Image.create({
            car_id: carId,
            img_url: req.files[i].path.substr(6),
          });
        }
        res.status(200).json('ImagesLoaded');
      } catch (error) {
        console.log('DB Upload URL Error:', error.message);
        Error(res, error.message);
      }
    } else {
      console.log('No CarID err');
      Error(res, 'No CarID err');
    }
  } else {
    console.log('Session id err');
    Error(res, 'Session id err');
  }
};
