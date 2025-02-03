const express = require("express");
const bodyParser = require("body-parser");
const cashierRoutes = require("./src/app/routes/cashier/cashierRoutes");
const amdminRoutes = require("./src/app/routes/admin/adminRoutes");
const connectDB = require("./src/app/config/database");
const dotenv = require("dotenv");
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


// cashier
app.use("/food-fusion/cashier", cashierRoutes);

// admin
app.use("/food-fusion/admin", amdminRoutes);


// Starting the server

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});







