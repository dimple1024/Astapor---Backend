const express = require("express");

const router = express.Router();

const app = express();

const mongoose = require("mongoose");

//To read from .env file, to keep the DB cred secret
require("dotenv/config");

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((err) => {
    console.log(`Error while connecting to DB :${err}`);
  });

// importing Auth routes
const authRoutes = require("./routes/auth");

// creating application-level middleware
app.use("/user", authRoutes);

app.get("/", () => console.log("Root Page!!"));

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is started at port:${port}`));
