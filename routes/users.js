var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var User = require("../models/user");
var passport = require("passport");
var authenticate = require("../authenticate");
// var router = express();
router.use(bodyParser.json());

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-type", "application/json");
        res.json({ err: err });
      } else {
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-type", "application/json");
            res.json({ err: err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-type", "application/json");
            res.json({ success: true, status: "Registration Successful!" });
          });
        });
      }
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-type", "application/json");
  res.json({
    success: true,
    status: "You are successfully logged in!",
    token: token,
  });
});

router.get("/logout", (req, res, next) => {
  // console.log(res.json());
  if (passport.authenticate('local')) {
    
    // res.clearCookie("session-id");    
    // res.headers.authorization = null;
    res.redirect("/");
  } else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
