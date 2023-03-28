// Import dependencies
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const cookieParser = require('cookie-parser')


//load env variables
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// express app config
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/../client/public"));
app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
  
);


//Require application Route modules
const userRoutes = require("./routes/users");
const reliefRoutes = require("./routes/reliefCenterRoute")
const collectionRoutes = require("./routes/ColllectionCenetrRoute")

app.use("/relief", reliefRoutes)
app.use("/collection", collectionRoutes)
app.use("/user", userRoutes);


app.listen(PORT, function () {
  console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
});
