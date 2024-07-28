const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./config/db");
const { connectRabbitMQ } = require("./config/rabbitmq");
const { signup } = require("./controller/signupController");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {

  console.log(`Request URL: ${req.url}`);

  next();
})

app.post("/user",signup);


async function startServer() {
  await connectRabbitMQ();
  await connectDB();
  app.listen(5001, () => {
    console.log("listening on 5001");
  });
}

startServer();
