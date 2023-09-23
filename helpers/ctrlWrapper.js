const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (er) {
      next(er);
    }
  };
  return func;
};
module.exports = ctrlWrapper;
