const internship = require("../models/jobSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchasyncerrors = require("../middleware/catchasyncerrors");
const ApiFeatures = require("../utils/apifeatures");

//get all internships
exports.getAllInternships = async (req,res) =>{

    const resultPerPage = 8;
     const Internshipcount = await internship.countDocuments();
    console.log('getting internship')
    const apifeature = new ApiFeatures(internship.find(),req.query).search().filter().pagination(resultPerPage);
    const display_internships = await apifeature.query;

    res.status(200).json({
        success:true,
        display_internships,
        Internshipcount,
    });
    // const response = {
    //     name : "XYZ",
    //     intern_name:'Web Development',
    //     stipend:'10000',
    // }

    // console.log(response)
    // res.status(200).json({
    //     response
    // })

};

//get particular internship details
exports.getInternshipdetails = catchasyncerrors(async(req,res,next) => {
    const internshipdetail = await internship.findById(req.params.id);
    if(!internshipdetail){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success:true,
        internshipdetail,
       
    });
});
