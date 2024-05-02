const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db/index");
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  const data = await User.findOne({ username: username, password: password });
  if (data) {
    return res.status(403).json({ msg: "User Already Exists" });
  }

  await User.create({
    username: username,
    password: password,
  });
  res.json({ msg: "User Created Successfully" });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({
    username,
    password,
  });
  console.log(user);
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

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const allCourse = await Course.find({});
  res.json({ Courses: allCourse });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );

  res.json({ msg: "Purchase Complete" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({
    username: req.headers.username,
  });

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({
    courses: courses,
  });
});

module.exports = router;
