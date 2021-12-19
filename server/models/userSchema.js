const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
        required: true,
      }
    }
  ],

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

  applied: [
    {
      job_id: {
        type: String,
      },
      company_name: {
        type: String,
      },
      internship: {
        type: String,
      },
      location: {
        type: String,
      },
      start_date: {
        type: String,
      },
      duration: {
        type: String,
      },
      stipend: {
        type: String,
      },
    }
  ],
});

//we are hashing the password

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("this isModified");

    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// we are generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign(
      {
        _id: this._id,
      },
      process.env.SECRET_KEY
    );

    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

// store the message
userSchema.methods.addMessage = async function(name, email, phone, message) {
  try {
    this.messages = this.messages.concat({name, email, phone, message});
    await this.save();
    return this.messages;
  } catch(error) {
    console.log(error);
  }
}

// store the applied internship company
userSchema.methods.addCompany = async function(job_id, company_name, internship, location, start_date, duration, stipend) {
  try {
    console.log('add company')
    console.log(this.applied)
    this.applied = this.applied.concat({job_id, company_name, internship, location, start_date, duration, stipend});
    await this.save();
    return this.applied_by;
  } catch(error) {
    console.log(error);
  }
}

const user = mongoose.model("users", userSchema);
// console.log(user.find({}))
module.exports = user;
