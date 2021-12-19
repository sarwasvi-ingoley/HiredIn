import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

const AppliedAt = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({company_name: "", internship: "", location: "", duration: "", stipend: ""})
  const [data, getData] = useState(null);

  const callIfLogin = async() => {
    try {
      const res =  await fetch('/getdata', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);
      if(! res.status === 200) {
        const error = new Error(res.error);
        throw error;
      } else {
        callAppliedAt();
      }
    } catch(err) {
      console.log(err);
      history.push('/login'); 
    }
  }

  useEffect(() => {
    callIfLogin();
    callAppliedAt();
    // getAllData();
  }, []);

  async function callAppliedAt() {
    try {
      const res =  await fetch('/appliedat', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      console.log('Applied At', data);
      getData(data)
    //   console.log(data.applied.map((internship)))
      if(!data[0]) {
          console.log('No internships')
          getData("No internships")
          
      } 
    } catch(err) {
      console.log(err);
      history.push('/login'); 
    }
  }

  if(data == null) {
    return <p>Loading...</p>
  } else if(data == "No internships") {
    return <div><h1 className ="text-center">Applied At</h1><div><h5 align = "center" style= {{color: 'grey'}}>You have not applied anywhere</h5></div></div>
  }

  return (
    <>
      <div className ="my-5">
            <h1 className ="text-center">Applied At</h1>
      </div>
      {
            data.map((item)=>(
                <div className = "internship col-md-10 col-12 mx-auto">
                <div className ="internship_info">
                    <p className ="company_name">{item.company_name}</p>
                    <p className= "internship_name">{item.internship}</p>
                    <p className = "location">{item.location}</p>
                    <p className = "duration">{item.duration}</p>
                    <p className = "stipend">{item.stipend}</p> 
                </div>
                </div>
            ))         
        }
        
    </>
  );
}

export default AppliedAt;
