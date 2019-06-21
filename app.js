const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const morgan = require("morgan");
const methodOverride = require("method-override");
const expressSession = require("express-session");
const MongoStore = require('connect-mongo')(expressSession);
const cookieParser = require("cookie-parser");
const passport = require("passport");
const app = express();
const sassMiddleware = require("node-sass-middleware");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(methodOverride('_method', { methods: ['POST', 'GET']}));

app.use(cookieParser());

app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("combined"));

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next) {
  if (req.user) {
      res.locals.user = req.user;
  }
  next();
});

app.use(sassMiddleware({
  src: __dirname + '/public',
  dest: __dirname + '/dest',
  outputStyle: 'compressed'
}))

app.use(express.static('dest'));


app.use(require("./routes"));


app.use(require("./middleware/error_handler_middleware"));


module.exports = app;