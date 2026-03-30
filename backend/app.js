require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

// DB Connection
const conn = require("./config/db.js");

//routes
const router = require("./routes/Router.js");

const port = process.env.PORT || 5000;

const app = express();

// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tulingramofc.vercel.app"
    ],
    credentials: true,
  })
);

// Upload Directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB Connection
const startServer = async () => {
  await conn(); // Waiting for connection to MongoDB

  app.use(router); // Only starts routes and server after connection

  app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
  });
};
startServer();
