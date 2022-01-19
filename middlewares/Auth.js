const AuthMiddleware = (req, res, next) => {
  console.log("bar");
  next();
};

module.exports = AuthMiddleware;
