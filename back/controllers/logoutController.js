exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('sid');
    res.sendStatus(200);
  } catch (error) {
    console.log('Login User Error ', error.message);
  }
};
