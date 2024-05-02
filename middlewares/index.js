const express = require("express");
const z = require("zod");

const app = express();

app.use(express.json());

const schema = z.array(z.number());

app.post("/health-checkup", function (req, res) {
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);
  if (!response.success) {
    res.status(401).json({ msg: "Wrong Inputs" });
  }
  res.send("Kidneys: "+kidneys);
});

app.get("/", function (req, res) {
  res.send("Hello Word");
});

app.listen(3000);
