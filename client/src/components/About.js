import React from "react";
import aboutus from "../images/aboutus.jpg";
import vision from "../images/vision.jpg";

function About() {
  return (
    <>
            <div className ="container-fluid mt-5" >
                <div className ="row">
                    <div className = "col-md-10 col-12 mx-auto">
                        {/* <h2 className ="text-center" style={{marginBottom: '10px', fontWeight: '600',  color: 'rgb(59, 59, 59)'}}>About Us</h2> */}
                        <div className ="row">
                            <div className ="col-md-6 col-12 hero-text order-md-0 order-1">
                                <img src = {aboutus} alt="aboutimage" width="400" height="450"/>
                            </div>
                            <div className ="col-md-6 col-12 hero-text order-md-0 order-1">
                            <p className ="aboutinfo" style={{color:'rgb(94, 90, 90)'}} align = "justify">Our website focuses on providing an opportunity to the students of our university to apply for summer internships. Students can create their profile and look for the internships provided by several companies and apply according to their skills and convenience. They can upload their resumes to make it easier for the companies to review at ease. Once reviewed, the company can mail the accepted students for further details directly, making it an autonomous system. Our team got inspired to initiate this after seeing the hardships faced by students to get their summer internships as an important milestone in their college life. This platform reduces the complexity and time for students to apply for internships at one hub.</p>
                            </div>
                        </div>
                        <div className ="row">
                        <div className ="col-md-6 col-12 hero-text order-md-0 order-1">
                                <img src = {vision} alt="visionimage" width="400"/>
                        </div>
                        <div className ="col-md-6 col-12 hero-text order-md-0 order-1">
                            <div className ="box" align = "justify">
                                <div className="ourfacility" style={{marginTop: '10px', backgroundColor: 'rgb(208, 229, 243)'}}>
                                <div className ="boxtext" style={{marginTop: '40px'}}>
                                    <p className="sub-heading" style={{fontWeight: '600', color:'rgb(73, 104, 172)'}} align = "justify">Our Vision</p>
                                    {/* <h1>Find the right <br> Internship for you</h1> */}
                                    <p className ="context" style={{color:'rgb(94, 90, 90)'}} align = "justify">We are a technology company on a mission to equip students with relevant skills and practical exposure to help them get the best possible start to their careers. Imagine a world full of freedom and possibilities.</p>
                                </div>
                                <div className ="boxtext" style={{marginTop: '40px'}}>
                                    <p className="sub-heading" style={{fontWeight: '600', color:'rgb(73, 104, 172)'}}>Proud Moments and Big Milestones</p>
                                    {/* <h1>Find the right <br> Internship for you</h1> */}
                                    <p className ="context" style={{color:'rgb(94, 90, 90)'}}>Connected more than 400 organizations with hundreds of people</p>
                                    <p className ="context" style={{color:'rgb(94, 90, 90)'}}>Posted over hundreds of internships opportunities.</p>
                                    {/* <button className ="btn-primary" onclick="">Read More</button> */}
                                </div>
                                </div>  
                            </div>
                        </div>
                        
                        </div> 
                    </div>
                </div>
            </div>
        </>
  );
}

export default About;
