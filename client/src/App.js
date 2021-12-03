import React, { useReducer, createContext } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import './index.css';
import { Route, Switch } from "react-router-dom";
import "../src/App.css";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Internships from "./components/Internships";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import ErrorPage from "../src/components/ErrorPage";
import ApplyInternship from "../src/components/ApplyInternship";
import {initialState, reducer} from "../src/reducer/UseReducer";

// context: API
export const UserContext = createContext();

const Routing = () => {
  return(
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Contact">
        <Contact />
      </Route>
      <Route path="/Internships">
        <Internships />
      </Route>
      <Route path="/About">
        <About />
      </Route>
      <Route path="/Login">
        <Login />
      </Route>
      <Route path="/Signup">
        <Signup />
      </Route>
      <Route path="/Logout">
        <Logout />
      </Route>
      <Route path="/ApplyInternship">
        <ApplyInternship />
      </Route>
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  )
}

const App = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <UserContext.Provider value = {{state, dispatch}}>

     
      <Navbar />
      <Routing />
      
      </UserContext.Provider>
    </>
  );
};

export default App;
