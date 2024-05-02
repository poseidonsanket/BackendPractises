const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
  "mongodb+srv://sanketdadali:12345@cluster0.vk7ri7w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const User = mongoose.model("User", {
  name: String,
  username: String,
  pasword: String,
});

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];


app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  const userExists = await User.findOne({username: username})
  if (userExists) {
    return res.status(403).json({
      msg: "User already exists",
    });
  }

  const user = new User({
    username: username,
    password: password,
    name: name,
  });
  
  user.save();
  res.json({
    "msg" : "User Created"
  })

//   var token = jwt.sign({ username: username }, jwtPassword);
//   return res.json({
//     token,
//   });
});

app.get("/users", async function (req, res) {
//   const token = req.headers.authorization;
//   try {
    // const decoded = jwt.verify(token, jwtPassword);
    // const username = decoded.username;
    // return a list of users other than this username
    const allUsers = await User.find();
    res.json({
      users: allUsers,
    });
//   } catch (err) {
//     return res.status(403).json({
//       msg: "Invalid token",
//     });
//   }
});

app.get("/", function (req, res) {
  res.send("Hello");
});

app.listen(3000);
