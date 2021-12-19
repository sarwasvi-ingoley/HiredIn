const express = require("express");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const PORT = process.env.PORT;
var cors = require('cors')
const app = express();
const cookieparser = require("cookie-parser");


dotenv.config({ path: "./config.env" });
const corsOptions ={
  origin:'*',            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
// app.use(cors(corsOptions))
require("./db/conn");
const User = require("./models/userSchema");
const Job = require("./models/jobSchema");

app.use(express.json());
app.use(cookieparser());

app.use(require("./router/auth"));
const internships = require("./router/auth");
app.use("/api/v1",internships);

// const middleWare = (req, res, next) => {
//   console.log("My middle ware");
//   next();
// };

app.get("/about", (req, res) => {
  res.send("Hello about from the server");
});

app.get("/appliedat", (req, res) => {
  res.send("Hello about from the server");
});

// app.get("/contact", (req, res) => {
//   res.send("Hello contact from the server");
// });
app.get("/signin", (req, res) => {
  res.send("Hello signin from the server");
});
// app.get("/signup", (req, res) => {
//   res.send("Hello signup from the server");
// });
app.listen(3001, () => {
  console.log("Server is running at port 3001");
});
