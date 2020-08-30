const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const expHBS = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/db");

// Load config file
dotenv.config({ path: "./config/config.env" });
// passport config
require("./config/passport")(passport);
// run Connect DB from config
connectDB();

// Initialize express
const app = express();

// Morgan HTTP Request Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars
app.engine(".hbs", expHBS({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Express Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder For Assets
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

// Set Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
