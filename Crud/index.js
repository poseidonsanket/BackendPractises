const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

app.listen(port);
