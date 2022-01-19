const AdminMiddleware = (req, res, next) => {
  console.log("bar");
  next();
};

module.exports = AdminMiddleware;
