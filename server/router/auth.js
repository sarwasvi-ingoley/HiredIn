const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { getAllInternships, getInternshipdetails } = require("../controllers/internshipcontroller");
const bcrypt = require("bcryptjs");
const authenticate = require('../middleware/authenticate');
require("../db/conn");

const User = require("../models/userSchema");
const Job = require("../models/jobSchema");
router.get("/", (req, res) => {
  res.send("Hello from the server router");
});

//using async await
router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(420).json({ error: "please fill it again" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(420).json({ error: "User already exits" });
    } else if (password != cpassword) {
      return res.status(420).json({ error: "password don't match" });
    } else {
      const user = new User({
        name: name,
        email: email,
        phone: phone, 
        password: password,
        cpassword: password,
      });

      const userRegister = await user.save();

      if (userRegister) {
        res.status(201).send("data is inserted");
      }
    }
  } catch (error) {
    res.status(500).send("there is an error");
    console.log(error);
  }
});

// login route

router.post("/login", async (req, res) => {
  console.log(req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "please fill the data again" });
    }

    const userLogin = await User.findOne({ email: email });

    console.log(userLogin);

    const isMatch = await bcrypt.compare(password, userLogin.password);

    const token = await userLogin.generateAuthToken();

    console.log(token);

    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),

      httpOnly: true,
    });
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
    } else {
      res.json({ message: "Signed in successfully" });
    }
  } catch (error) {}
});

// internships
router.get("/internships", authenticate, (req, res) => {
  res.send(req.rootUser);
});
router.route("/getinternships").get(getAllInternships);
router.route("/getinternships/:id").get(getInternshipdetails)

// getting user data for contact us
router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
})
// contact us page
router.post("/contact", authenticate, async (req, res) => {
    try {
      console.log(req.body);
      const {name, email, phone, message} = req.body;
      if(!name || !email || !phone || !message) {
        console.log("Please fill the contact form");
        return res.status(400).json({error: "Please fill the contact form"})
      }
      const userContact = await User.findOne({_id: req.userID});
      if(userContact) {
        const userMessage = await  userContact.addMessage(name, email, phone, message);
        await userContact.save();
        res.status(201).json({message: "User contact successfully"});
      }
    } catch(error) {

    }
});

// apply 
router.post("/applyinternship", authenticate, async (req, res) => {
  try {
    console.log(req.body);
    const {job_id, name, email, phone, college, resume} = req.body;
    if(!name || !email || !phone || ! college || !resume) {
      console.log("Please fill the contact form");
      return res.status(400).json({error: "Please fill the contact form"})
    }
    const jobApply = await Job.findOne({_id: job_id});
    if(jobApply) {
      const userMessage = await  jobApply.addApply(name, email, phone, college, resume);
      await jobApply.save();
      res.status(201).json({message: "User internship added successfully"});
    }
  } catch(error) {

  }
});

// logout
router.get("/logout", (req, res) => {
  res.clearCookie('jwtoken', {path: '/'});
  res.status(200).send('User logout');
});

module.exports = router;
