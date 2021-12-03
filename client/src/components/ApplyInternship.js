import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import contactimage from "../images/contactus.png";

function ApplyInternship() {
    // for on change event
  const [userData, setUserData] = useState({name: "", email: "", phone: "", college: "", resume: ""})
  const [pdfFile, setPdfFile] = useState(null);

  // don't touch this
  const userContact = async() => {
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
            reader.onloadend = (e) => {
                console.log(e.target.result);
                setUserData({ ...userData, resume: e.target.result });
            }
        }
    } else {
        setPdfFile(null);
        console.log('Select your file');
    }
    const formData = new FormData();
    formData.append('pdf', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
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
    console.log(userData)
    // const {name, email, phone, message} = userData;
    // console.log(userData)
    // console.log(name, email, phone, message)
    //  const res = await fetch('/contact', {
    //    method: "POST",
    //    headers: {
    //     "Content-Type": "application/json",
    //     'Accept': 'application/json'
    //    },
    //    body: JSON.stringify({
    //      name, email, phone, message,
    //    }),
    //  });
    //  const data = await res.json();
    //  if(!data) {
    //    console.log("Message not sent");
    //  } else {
    //    alert("Message sent");
    //    setUserData({...userData, message: ""});
    //  }
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
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Full Name</label>
                                <input type="text" class="form-control" name = "name" id="exampleFormControlInput1" value = {userData.name} onChange = {handleInputs} placeholder="Enter your Fullname *" required/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email</label>
                                <input type="email" class="form-control" name = "email" id="exampleFormControlInput1" value = {userData.email} onChange = {handleInputs} placeholder="name@example.com *" required/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Contact</label>
                                <input type="number" class="form-control" name = "phone" id="exampleFormControlInput1" value = {userData.phone} onChange = {handleInputs}placeholder="Enter your contact number *" required/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">College / Orgazation Name</label>
                                <input type="text" class="form-control" name = "college" id="exampleFormControlInput1" rows="3" required value = {userData.college} placeholder="Enter your college or organization *" onChange = {handleInputs} required/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Resume</label>
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

    
    // <div>
    //   <h1 className="text-center mt-4">Get in Touch</h1>

    //   <div className="container">
    //     <form method = "POST">
    //       <div className="form-group">
    //         <label for="exampleInputEmail1">Your Name</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="exampleInputEmail1"
    //           aria-describedby="emailHelp"
    //           name = "name"
    //           value = {userData.name}
    //           placeholder="Your Name"
    //           onChange = {handleInputs}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label for="exampleInputEmail1">Email address</label>
    //         <input
    //           type="email"
    //           className="form-control"
    //           id="exampleInputEmail1"
    //           aria-describedby="emailHelp"
    //           name = "email"
    //           value = {userData.email} 
    //           placeholder="Your Email"
    //           onChange = {handleInputs}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label for="exampleInputPassword1">Your Phone</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="exampleInputPassword1"
    //           name = "phone"
    //           value = {userData.phone}
    //           placeholder="Your Phone"
    //           onChange = {handleInputs}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label for="exampleInputPassword1">Your Message</label>
    //         <textarea
    //           className="form-control"
    //           id="exampleInputPassword1"
    //           name = "message"
    //           value = {userData.message}
    //           placeholder="Your Message"
    //           onChange = {handleInputs}
    //         ></textarea>
    //       </div>

    //       <div className="text-center">
    //         <button type="submit" className="btn btn-primary  m-4" onClick = {contactForm}>
    //           Send Message
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
}

export default ApplyInternship;
