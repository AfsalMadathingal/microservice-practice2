const express = require("express");
const cors = require("cors");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(cors());


app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers, null, 2)}`);
  console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
  next();
});


app.use("/", (req, res,next) => {
  console.log("API Gateway is working");
  next();
});

const proxyTargets = {
  signup: "http://localhost:5001",
  login: "http://localhost:5002",
};

app.use(
  "/api/signup",
  createProxyMiddleware({
    target: proxyTargets.signup,
    changeOrigin: true,
    
  })
);
app.use(
  "/api/login",
  createProxyMiddleware({
    target: proxyTargets.login,
    changeOrigin: true,
  })
);



app.use((err, req, res, next) => {
  console.error("Proxy Error:", err);
  res.status(500).send("Proxy Error");
});

app.listen(9000, () => {
  console.log("server is running on the port 9000");
});