const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const expHBS = require("express-handlebars");
const connectDB = require("./config/db");
const indexRouter = require("./routes/index");
// Load config file
dotenv.config({ path: "./config/config.env" });
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

// Static Folder For Assets
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);

// Set Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
