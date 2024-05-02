const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const users = [
  {
    name: "john",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.use(bodyParser.json());

app.get("/", (req, res) => {
  const johnKidneys = users[0].kidneys.length;
  let healthyKidneys = 0;
  let unhealthyKidneys = 0;
  for (let i = 0; i < johnKidneys; i++) {
    if (users[0].kidneys[i].healthy == true) {
      healthyKidneys++;
    } else if (users[0].kidneys[i].healthy == false) {
      unhealthyKidneys++;
    }
  }
  res.json({
    johnKidneys,
    healthyKidneys,
    unhealthyKidneys,
  });
});

app.post("/", (req, res) => {
  //add kidney
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.send("Done");
});

app.put("/", (req, res) => {
  //make kidneys healthy
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({
    msg: "Done",
  });
});

app.delete("/", (req, res) => {
  //delete unhealthy kidneys
  //no unhealthy kidneys return 411 status code
  let unhealthyKidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      unhealthyKidney = true;
    }
  }
  if (!unhealthyKidney) {
    const newKidneys = users[0].kidneys.filter((kid) => kid.healthy == true);
    users[0].kidneys = newKidneys;
    res.send("Done");
  }
  else {
    res.status(411).json({
        msg : "Invalid Request",
    });
  }
});

app.listen(3001);
