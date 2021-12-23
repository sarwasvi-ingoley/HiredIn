import React, {useContext} from "react";
import { Link } from "react-router-dom";
import {UserContext} from "../App";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const {state, dispatch} = useContext(UserContext);
  const RenderMenu = () => {
    if(state) {
      return (
        <>
          <li className="nav-item ">
              <NavLink className="nav-link"  to="/">Home</NavLink>                
          </li>
          <li className="nav-item">
            <NavLink exact className="nav-link"  to="/about">About Us</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact className="nav-link"  to="/contact">Contact</NavLink>
          </li>
          <li className="nav-item">
              <NavLink exact className="nav-link"  to="/appliedat">Applied At</NavLink>
          </li>
          <li className="nav-item">
              <NavLink exact className="nav-link"  to="/logout">Logout</NavLink>
          </li>
        </>
      )
    } else{
      return(
        <>
           <li className="nav-item ">
              <NavLink className="nav-link"  to="/">Home</NavLink>                
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link"  to="/about">About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link"  to="/contact">Contact Us</NavLink>
            </li>
            <li className="nav-item">
                <NavLink exact className="nav-link"  to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink exact className="nav-link"  to="/signup">Sign Up</NavLink>
            </li>
        </>
      )
    }


    
  }
  return (
    <>
      <div className ="container-fluid navbar_style" id ="header" style ={{backgroundColor:'#161818'}}>
        <div className ="row">
            <div className = "col-md-10 col-12 mx-auto">
                <nav className="navbar navbar-expand-lg navbar-custom">
                    <div className="container-fluid">
                        <div className="navbar-brand" href="/" style= {{fontSize: '26px'}}><b>HiredIn</b> Internships</div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                  <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="ml-auto" id="navbarSupportedContent">
                            <ul className="navbar-nav ">
                            <RenderMenu />
                            </ul>
                          </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    </>
  );
};

export default Navbar;
