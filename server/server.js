const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// dotenv config
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// Home route
 if (process.env.NODE_ENV !== "production") {
    app.get("/", (req, res) => {
      res.status(200).send({
        message: "Server is running (DEV)",
      });
    });
  }
// ROUTES
// USER Route
app.use("/api/v1/user", require("./routes/userRoutes"));

// static files
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }
  
// listen the server
const startServer = async () => {
  await connectDB(); // Connect to DB
  app.listen(port, () => {
    console.log(` Server running on port ${port}`);
  });
};

startServer();
