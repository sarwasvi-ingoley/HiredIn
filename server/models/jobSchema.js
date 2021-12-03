const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const jobSchema = new Schema(
//   {
//     index: {
//       type: String
//     },
//     company: {
//       type: String,
//     },
//     internship: {
//       type: String,
//     },
//     location: {
//       type: String,
//     },
//     "start date": {
//       type: String,
//     },
//     duration: {
//       type: String,
//     },
//     stipend: {
//       type: String,
//     },
//     "posted on": {
//       type: String,
//     },
//     "apply by": {
//       type: String
//     },
//     applied: [
//         {
//             name: {
//                 type: String,
//                 required: true,
//               },
//               email: {
//                 type: String,
//                 required: true,
//               },
//               phone: {
//                 type: Number,
//                 required: true,
//               },
//               message: {
//                 type: String,
//                 required: true,
//               },
//               resume: {
//                   type: String,
//                   required: true,
//               }
//         }
//     ]
// });

const jobSchema = new Schema({

    company:{
        type:String,
        required:true,
    },
    internship:{
        type:String,
        required:true,
    },
    internship:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    startdate:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        require:true,
    },
    stipend:{
        type:String,
        required:true,
    },
    postedon:{
        type:Date,
        required:true,
    },
    applyby:{
        type:Date,
        required:true,
    },
    
})

// store applied people info
jobSchema.methods.addApply = async function(name, email, phone, college, resume) {
    try {
      this.applied = this.applied.concat({name, email, phone, college, resume});
      await this.save();
      return this.applied;
    } catch(error) {
      console.log(error);
    }
  }

const Job = mongoose.model("job", jobSchema);
module.exports = Job;
