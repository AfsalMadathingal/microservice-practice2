const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./config/db");
const { connectRabbitMQ, listenForNewUser } = require("./config/rabbitmq");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});


async function startServer() {
  await connectRabbitMQ();
  await listenForNewUser()
  await connectDB();
  app.listen(5002, () => {
    console.log("listening on 5002");
  });
}

startServer();
