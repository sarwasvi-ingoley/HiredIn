const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require('multer');
const { getAllInternships, getInternshipdetails, uploadUserResume } = require("../controllers/internshipcontroller");
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
        return res.status(201).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "There is an error" });
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
      console.log("Please fill the apply form");
      return res.status(400).json({error: "Please fill the apply form"})
    }
    const jobApply = await Job.findOne({_id: job_id});
    console.log(jobApply)
    if(jobApply) {
      console.log('applied by length: ', jobApply.applied_by.length)
      for(let i = 0; i < jobApply.applied_by.length; i++) {
        if(jobApply.applied_by[i].email === email) {
          return res.status(400).json({error: "You have already applied for this position at this company"})
        }
      }
      const userApply = await User.findOne({_id: req.userID});  
      await jobApply.save();
      const jobAppliedBy = await  jobApply.addApply(name, email, phone, college, resume);
      const userAppliedBy = await userApply.addCompany(jobApply._id, jobApply.company, jobApply.internship, jobApply.location, jobApply.startdate, jobApply.duration, jobApply.stipend, jobApply.worktype)
      await userApply.save();
      console.log('Application sent successfully')
      res.status(201).json({message: "User internship added successfully"});
    
    } else {
      console.log('Job not found')
      res.status(400).json({error: "Job not found"})
    }
  } catch(error) {
    console.log(error)
    res.status(400).json({error: "There is a error"})
  }
});

// initialize multer
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploadresumes');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
      return cb(
        new Error(
          'only upload files with pdf, doc, docx format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

//uploading resume
router.post("/uploadresume", upload.single('resume'), uploadUserResume)

//applied at
router.get("/appliedat", authenticate, (req, res) => {
  res.send(req.rootUser.applied);
});
// router.get("/appliedat", authenticate, (req, res) => {
//   const userContact = await User.findOne({_id: req.userID});
//   console.log('User Contact (applied at)', userContact)
// })

// logout
router.get("/logout", (req, res) => {
  res.clearCookie('jwtoken', {path: '/'});
  res.status(200).send('User logout');
});

module.exports = router;
