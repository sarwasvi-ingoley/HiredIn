const internship = require("../models/jobSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchasyncerrors = require("../middleware/catchasyncerrors");
const ApiFeatures = require("../utils/apifeatures");

//get all internships
exports.getAllInternships = async (req,res) =>{

    // const resultPerPage = 8;
     const Internshipcount = await internship.countDocuments();
    console.log('getting internship')
    const apifeature = new ApiFeatures(internship.find(),req.query).search().filter();
    // .pagination(resultPerPage);
    const display_internships = await apifeature.query;

    res.status(200).json({
        success:true,
        display_internships,
        Internshipcount,
    });
};

exports.uploadUserResume = async(req, res) => {
    res.send(`${req.file.path}`)
}

//get particular internship details
exports.getInternshipdetails = catchasyncerrors(async(req,res,next) => {
    const internshipdetail = await internship.findById(req.params.id);
    if(!internshipdetail){
        return next(new ErrorHandler("Internship not found",404));
    }
    res.status(200).json({
        success:true,
        internshipdetail,
       
    });
});
