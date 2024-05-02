const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router = Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const data = await Admin.findOne({ username: username, password: password });
  if (data) {
    return res.status(403).json({ msg: "Admin Already Exists" });
  }

  await Admin.create({
    username: username,
    password: password,
  });
  res.json({ msg: "Admin Created Successfully" });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await Admin.findOne({
    username,
    password,
  });
  console.log(user)
  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );

    res.json({
      token,
    });
  } else {
    res.status(411).json({
      message: "Incorrect email and pass",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });

  res.json({ msg: "Course created successfully", courseId: newCourse._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const allCourse = await Course.find({});
  res.json({ Courses: allCourse });
});

module.exports = router;
