import React, { useReducer, createContext,useState } from "react";
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
import"./components/Internships.js";
// context: API
export const UserContext = createContext();


// const Routing = () => {
//   return(
//     <Switch>
//       <Route exact path="/">
//         <Home />
//       </Route>
//       <Route path="/Contact">
//         <Contact />
//       </Route>
//       <Route path="/Internships">
//         <Internships
//           onLocationFilter = {handleFilterLocation}
//         />
//       </Route>
//       <Route path="/About">
//         <About />
//       </Route>
//       <Route path="/Login">
//         <Login />
//       </Route>
//       <Route path="/Signup">
//         <Signup />
//       </Route>
//       <Route path="/Logout">
//         <Logout />
//       </Route>

//       <Route path="/ApplyInternship">
//         <ApplyInternship />
//       </Route>
//       <Route>
//         <ErrorPage />
//       </Route>
//     </Switch>
//   )
// }

const App = () => {
  const[data, setData] = useState();
  const [state, dispatch] = useReducer(reducer, initialState)

//   async function getAllData() {
//     const response = await fetch('/api/v1/getinternships')
//     const data = await response.json()
//     console.log(data)
//     setData(data)
// }
 //console.log(data)
  const handleFilterLocation = async(location) => {
    const response = await fetch('/api/v1/getinternships')
    const data = await response.json()
    console.log(data)
    setData(data)
    const filteredData = data.display_internships.filter((item) => {
      if(item.location.toLowerCase().includes(location.toLowerCase())){
        return item
      };
    });
    setData(filteredData);
    console.log(filteredData)
  }
  return (
    <>
      <UserContext.Provider value = {{state, dispatch}}>
      <Navbar />
      {/* <Routing /> */}
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Contact">
        <Contact />
      </Route>
      <Route path="/Internships">
        <Internships
          onLocationFilter = {handleFilterLocation}
        />
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
    
      </UserContext.Provider>
    </>
  );
};

export default App;
