const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    index: {
      type: String
    },
    company: {
      type: String,
    },
    internship: {
      type: String,
    },
    location: {
      type: String,
    },
    startdate: {
      type: String,
    },
    duration: {
      type: String,
    },
    stipend: {
      type: String,
    },
    posted_on: {
      type: String,
    },
    apply_by: {
      type: String
    },
    worktype: {
      type: String
    },
    applied_by: [
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
              college: {
                type: String,
                required: true,
              },
              resume: {
                  type: String,
                  required: true,
              }
        }
    ]
});

// store applied people info
jobSchema.methods.addApply = async function(name, email, phone, college, resume) {
  try {
    console.log('addapply')
    console.log(this.applied_by)
    this.applied_by = this.applied_by.concat({name, email, phone, college, resume});
    await this.save();
    return this.applied_by;
  } catch(error) {
    console.log(error);
  }
}

const Job = mongoose.model("jobs", jobSchema);
// console.log(Job.find({}))
module.exports = Job;
