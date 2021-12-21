import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import signupimage from "../images/signup.png";
function Signup() {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);

    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, cpassword } = user;

    const resp = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
      }),
    });
    console.log(resp)
    const data = await resp.json();
    console.log(data);
    console.log(resp.status);
    if (resp.status === 201 && data) {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      history.push("/Login");
    } else if(resp.status === 420 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } 
  };
  return (
    <div className ="container login_div">
      <div className ="row">
        <div className ="col-md-6 col-12 hero-text order-md-0 order-1" style={{paddingTop:'130px'}}>
             <img src ={signupimage} alt="vectorimage" height="470" style={{paddingRight:'50px'}}/>
         </div>
        <div className = "col-md-6 col-10 mx-auto">
          <form method="POST">
            <div className ="my-5">
              <h1 className ="text-center" > Create New Account </h1>
             </div>
            <div class="mb-3">
              <label for="exampleInputPassword1">Name *</label>
              <input
                type="text"
                name="name"
                class="form-control"
                id="exampleInputPassword1"
                value={user.name}
                onChange={handleInputs}
                placeholder="Enter your name"
                required
              />
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1">Email address *</label>
              <input
                type="email"
                name="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={user.email}
                onChange={handleInputs}
                placeholder="Enter email"
                required
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1">Contact No. *</label>
              <input
                type="text"
                name="phone"
                class="form-control"
                id="exampleInputPassword1"
                value={user.phone}
                onChange={handleInputs}
                placeholder="Enter Contact number"
                required
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1">Password *</label>
              <input
                type="password"
                class="form-control"
                name="password"
                id="exampleInputPassword1"
                value={user.password}
                onChange={handleInputs}
                placeholder="Enter Password *"
                required
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1">Confirm Password *</label>
              <input
                type="password"
                name="cpassword"
                class="form-control"
                id="exampleInputPassword1"
                value={user.cpassword}
                onChange={handleInputs}
                placeholder="Re-enter Password *"
                required
              />
            </div>
            <div className="text-center">
              <button
                class="btn btn-primary"
                type="submit"
                onClick={postData}
                class="btn btn-primary  m-4"
              >
                Register
              </button>
            </div>
            <p align = "center">Have an account? <Link exact className="loginlink" style={{ color: '#022b2b'}}  to={{pathname: "/login"}}>Login</Link></p>
          </form>
        </div>
        
      </div>    
    </div>    
  );
}

export default Signup;
