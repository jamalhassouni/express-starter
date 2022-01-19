const Router = require("express-group-router");
const AdminMiddleware = require("../middlewares/Admin");
const AuthMiddleware = require("../middlewares/Auth");
const validationMiddleware = require("../middlewares/validationMiddleware");
const { userSchemas } = require("../schemas");
let router = new Router();

router.get("/", (req, res) => {
  res.send("Hello world");
});

router.group("/api", [AuthMiddleware], (router) => {
  router.get(
    "/a",
    validationMiddleware(userSchemas.register, "body"),
    (req, res) => {
      res.send("Foo");
    }
  );

  router.group("/bar", [AdminMiddleware], (router) => {
    router.get("/test", (req, res) => {
      res.send("Test Bar");
    });
  });
});

module.exports = router.init();
