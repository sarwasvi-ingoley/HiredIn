import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import contactimage from "../images/contactus.png";
import {useHistory, useLocation} from 'react-router-dom';
import Axios from "axios";

const ApplyInternship = () => {
 
  // for on change event
  const [userData, setUserData] = useState({name: "", email: "", phone: "", college: "", resume: ""})
  const [pdfFile, setPdfFile] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const formData = new FormData();
  const {state} = useLocation();
  const history = useHistory();
  
  const userContact = async() => {
    console.log('State', {state})
    console.log('State job_id', state['job_id'])
    setCompanyName(state['company_name'])
    try {
      const res =  await fetch('/getdata', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserData({...userData, name: data.name, email: data.email, phone: data.phone});
      if(! res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch(err) {
      console.log(err);
    }
  }

  const fileType = ['application/pdf'];
  const uploadPdf = async(e) => {
    e.preventDefault()
    const file = e.target.files[0];
    if(file) {
        if(file && fileType.includes(file.type)) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            if(file.name.match(/\.(pdf)$/)) {
              reader.onloadend = (e) => {
                console.log(e.target.result);
                setUserData({ ...userData, resume: e.target.result });
              }
            } else {
              alert('Upload pdf files only')
            }
        }
    } else {
        setPdfFile(null);
        console.log('Select your file');
    }
    
    formData.append('resume', file);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    const { data } = await Axios.post('/uploadresume', formData, config);
    setUserData({ ...userData, resume: data });
 }
  useEffect(() => {
    userContact();
  }, []);

  // storing data in states
  const handleInputs= (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  }
  // sending data to backend
  const applyForm = async (e) => {
    e.preventDefault();
    const {name, email, phone, college, resume} = userData;
    console.log({name, email, phone, college, resume})
    const res = await fetch('/applyinternship', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": 'multipart/form-data',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        job_id: state['job_id'],
        name, email, phone, college, 
        resume,
      }),
    });
    const data = await res.json();
    if(res.status === 400 || !data) {
      console.log("Application not sent");
      alert(data.error)
    } else if(res.status === 201 && data){
      alert("Application sent");
      history.push("/internships");
    } else {
      console.log("Application not sent");
    }
  }

  return (
    <>
            <div className ="my-5">
                <h1 className ="text-center"> Apply Now </h1>
            </div>
            <div className ="container contact_div">
                <div className ="row">
                    <div className ="col-md-6 col-12 hero-text order-md-0 order-1">
                         <img src ={contactimage} alt="vectorimage"  height="370"/>
                     </div>
                    <div className = "col-md-6 col-10 mx-auto">
                        <form>
                          <h5 for="exampleFormControlInput1" class="form-label" align = "center" style= {{color: 'grey'}}><b>{companyName}</b></h5>
                            {/* <h1 className ="text-center"  style= {{color: 'grey'}}> </h1> */}
                        
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Full Name *</label>
                                <input type="text" class="form-control" name = "name" id="exampleFormControlInput1" value = {userData.name} onChange = {handleInputs} placeholder="Enter your Fullname *" required/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email *</label>
                                <input type="email" class="form-control" name = "email" id="exampleFormControlInput1" value = {userData.email} onChange = {handleInputs} placeholder="name@example.com *" required/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Contact *</label>
                                <input type="number" class="form-control" name = "phone" id="exampleFormControlInput1" value = {userData.phone} onChange = {handleInputs}placeholder="Enter your contact number *" required/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">College / Orgazation Name *</label>
                                <input type="text" class="form-control" name = "college" id="exampleFormControlInput1" rows="3" required value = {userData.college} placeholder="Enter your college or organization *" onChange = {handleInputs} required/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Resume *</label>
                                <input type="file" class="form-control" name = "resume" id="exampleFormControlInput1" rows="3" onChange={uploadPdf} required/>
                            </div>
                            
                            <div class="mb-7">
                                <button class="btn btn-primary" type="submit" onClick = {applyForm}>Submit form</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
  );
}

export default ApplyInternship;
