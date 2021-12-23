import React from "react";
import vectorimage from "../images/homepgvector.jpg";
import interns from "../images/interns.jpg";
import jobs from "../images/job.jpg";
import partime from "../images/parttime.png";
import fulltime from "../images/fulltime.png";
import workfromhome from "../images/wfh.png";
import engineering from "../images/eng.jpg";
import { useHistory } from "react-router-dom";
const Home = () =>{
    const history = useHistory();
  
        const handleRoute = () =>{ 
          history.push("/internships");
        }
    return(
        <>
        
        <div className ="container-fluid mt-5">
         <div className ="row">
              <div className = "col-md-10 col-12 mx-auto">
                 <div className ="row">
                     <div className ="col-md-6 col-12 hero-text order-md-0 order-1 d-flex justify-content-center align-items-start flex-column">
                         <h1 style={{fontWeight: 'bold'}}>Find the right </h1>
                         <h1 style={{fontWeight: 'bold'}}> Internship for you </h1>
                         <h4 style={{fontWeight: 550}}>Gain work experience and kickstart your career</h4>
                         <button className ="btn btn-primary" onClick={handleRoute}>View Internships</button>
                     </div>
                     <div className ="col-md-6 col-12 hero-text order-md-0 order-1">
                         <img src = {vectorimage} alt="vectorimage"/>
                     </div>
                 </div> 
             </div>
         </div>
         <div className ="row" style={{backgroundColor: 'rgb(208, 229, 243)', margin: '10px 0px 15px 5px'}}>
             <div className = "col-md-10 col-12 mx-auto">
                 <div className="row">
                     <div className ="col-md-6">
                         <div className ="box">
                             <div className="ourfacility">
                                 <div className ="boximage">
                                     <img src={interns} alt="interns" width="250" height="230" style={{float: 'left',  margin: '10px 0px 20px 0px'}}/>
                                     {/* <p className ="d-flex" style="padding: 80px 20px 20px 0px;">Find internships from great companies to give a kickstart to your career</p> */}
                                </div>.
                                 <div className ="boxtext" style={{marginTop: '40px'}}>
                                    <p className="sub-heading">Internships</p>
                                    <p className ="context">
                                    Find internships from great companies to give a kickstart to your career
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className ="col-md-6">
                        <div className ="box">
                            <div className="ourfacility">
                                <div className ="boximage">
                                    <img src={jobs} alt="interns" width="280" height="230" style={{float: 'left',  margin: '10px 0px 20px 0px'}}/>
                                    {/* <p className ="d-flex" style="padding: 80px 20px 20px 0px;">Find internships from great companies to give a kickstart to your career</p> */}
                                </div>.
                                  <div className ="boxtext" style={{marginTop: '40px'}}>
                                    <p className="sub-heading">Fresher Jobs</p>
                                    <p className ="context">
                                    Get premium fresher jobs with a minimum CTC of 3LPA
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row" id ="catg">
            <div className = "col-md-10 col-12 mx-auto">
                <div className ="catgcontainer">
                    <h2 style={{margin: '30px 0px 40px 0px', textAlign:'center', fontWeight: '600', color: 'rgb(59, 59, 59)'}}>Popular categories</h2>
                    <div className= "row justify-content-center align-items-center">
                        <div className ="col-md-3">
                       
                            <div className= "catgimg">
                                <img src={partime} alt="partime" height="100"/>
                            </div>
                            <div className= "catgtext">
                                <p className="ctext" style ={{paddingLeft: '15px'}}> Part-time </p>
                                
                            </div>
                        
                        </div>
                        <div className ="col-md-3">
                       
                            <div className= "catgimg">
                                <img src={fulltime} alt="fulltime" height="100"/>
                            </div>
                            <div className= "catgtext">
                                <p className="ctext" style = {{paddingLeft: '45px'}}> Full-time </p>
                            </div>
                      
                        </div>
                        <div className ="col-md-3">
                        
                            <div className= "catgimg" style={{marginLeft: '25px'}}>
                                <img src={workfromhome} alt="workfromhome" height="100"/>
                            </div>
                            <div className= "catgtext">
                                <p className="ctext" style = {{paddingLeft: '30px'}}> Work From Home</p>
                            </div>
                       
                        </div>
                       
                    </div>
                    
                 </div>
             </div>
         </div>
        
     </div>
        </>
    );
};

export default Home;
