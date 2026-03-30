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
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://tulingram.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // permite requests sem origin (ex: Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔥 ESSENCIAL PRA PREFLIGHT
app.options("*", cors());

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
