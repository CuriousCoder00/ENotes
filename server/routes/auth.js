const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fetchuser = require("../middlewares/fetchuser");

dotenv.config();

// Creating a new user. Endpoint: /api/auth/createuser
router.post(
  "/createuser",
  [
    body(
      "name",
      "Name shouldn't be empty. Please enter valid name."
    ).notEmpty(),
    body("email", "Please enter a valid email.").isEmail(),
    body("password", "Password must be atleast of 5 characters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check if the user with this email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Login credentials error." });
      }
      // Generating salt using genSalt function
      const salt = await bcrypt.genSalt(10);
      // Hashing the password using hash function
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // Generating auth token using jwt.sign()
      const authToken = jwt.sign(
        { user: { id: user.id } },
        process.env.JWT_SECRET
      );
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error.");
    }
  }
);

// Authenticate a user using: POST "/api/auth/login"
router.post(
  "/login",
  [
    // body('email', 'Please enter a valid email.').isEmail(),
    // body('password', 'Password cannot be blank.').exists()
  ],
  async (req, res) => {
    // If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Destructring email and password from request body
    const { email, password } = req.body;
    try {
      // Finding user if it exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Login credentials error." });
      }
      // Comparing entered password and hashed password
      const passwordCompare = await bcrypt.compare(password, user.password);
      // If entered password and hashed password => false:
      if (!passwordCompare) {
        return res.status(400).json({ error: "Login credentials error." });
      }
      // Generating auth token using jwt.sign()
      const authToken = jwt.sign(
        { user: { id: user.id } },
        process.env.JWT_SECRET
      );
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error.");
    }
  }
);

// Get user details using: POST "api/auth/getuser"
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error.");
  }
});

// Logout user: POST "api/auth/logout"
router.post("/logout", fetchuser, async (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });
    res.status(200).send("User logged out successfully.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
