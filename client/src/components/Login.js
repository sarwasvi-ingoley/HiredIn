import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from "../App";
import { Link } from 'react-router-dom';

function Login() {

  const {state, dispatch} = useContext(UserContext);

  const history = useHistory();
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');
  const loginUser = async(e) => {
      e.preventDefault();
      const res = await fetch('/login', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              email,
              password,
            }),
      });
      const data = res.json();
      if(res.status === 400 || !data) {
          window.alert("Invalid Credentials");
      } else {
          dispatch({type: "USER", payload: true}) //syntax: action type and additional message
          window.alert("Login Successful");
          history.push("/");
      }
  }
 
  return (
    <div className ="my-5">
      <h1 className ="text-center">Sign Up</h1>
      <div className="container">
        <div className = "col-md-6 col-10 mx-auto">
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1">Email address *</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1">Password *</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-center">
              <button type="submit" class="btn btn-primary  m-4" onClick = {loginUser}>
                Login
              </button>
            </div>
          </form>
        </div>
        <p align = "center">New to HiredIn? Sign up <Link exact className="loginlink" style={{ color: '#022b2b'}}  to={{pathname: "/signup"}}>here</Link></p>
      </div>
    </div>
  );
}

export default Login;
