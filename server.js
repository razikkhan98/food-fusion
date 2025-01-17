const express = require("express");
const bodyParser = require("body-parser");
const cashierRoutes = require("./src/app/routes/cashier/cashierRoutes");
const connectDB = require("./src/config/database");
const session = require("express-session");
const dotenv = require("dotenv");
const MongoStore = require("connect-mongo");
const cors = require("cors");

dotenv.config();

// Connect to the database

connectDB();

// Initiate express app

const app = express();

const port = process.env.PORT || 9000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes

app.use("/foodskill/cashier", cashierRoutes);

// Starting the server

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
