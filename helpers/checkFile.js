const checkFile = (req, res, next) => {
  if (!req.file) {
    console.warn('Avatar is not uploaded')
    req.file = {};
  }
  next();
};

module.exports = checkFile;
