
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/controllers");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// const authJwt = require('../middleware/authJwt')

module.exports = function (app) {
  app.use(function (req, res, next) {
    console.log('reqqqq', req.body)
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup", (req, res) => {
      verifySignUp.checkDuplicateNameOrEmail(req, res);
      controller.signup(req, res);

    });
  app.post("/api/auth/signin", (req, res) => {
    controller.signin(req, res);
  });
  app.post("/upload_files", upload.array("files"),
    controller.uploadFiles(req, res)
  )
  app.delete("/delete-file", controller.deleteFile(req, res));

  app.get("/get-file", controller.getFile(req, res));
}
