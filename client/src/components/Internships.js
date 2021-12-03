import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

function Internships() {
  const history = useHistory();
  const [userData, setUserData] = useState({})
  const [data, getData] = useState(null);
  const callInternshipPage = async() => {
    try {
      const res =  await fetch('/internships', {
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
        // getAllData();
      }
    } catch(err) {
      console.log(err);
      history.push('/login'); 
    }
  }
  useEffect(() => {
    callInternshipPage();
    getAllData();
  }, []);

    // const url = 'http://localhost:4000/api/v1/internships'

    // useEffect(() => {
    //     getAllData();
    // }, [])

    async function getAllData() {
        const response = await fetch('/api/v1/getinternships')
        const data = await response.json()
        console.log(data)
        getData(data)
    }

    if(data == null) {
        return <p>Loading...</p>
    }

  

  return (
    <>
      <div>
            {
                data.display_internships.map((item)=>(
                    <div className = "internship col-md-10 col-12 mx-auto">
                 <div className ="internship_info">
                     <p className ="company_name">{item.company}</p>
                     <p className= "internship_name">{item.internship}</p>
                     <p className = "stipend">{item.stipend}</p>
                     <div className ="viewintrndetails" style ={{marginBottom: '30px'}}>
                     <Link exact className="detaillink" style={{ color: '#022b2b'}}  to={{
    pathname: "/applyinternship",
    /*state: data */}}>Apply Now</Link>
                     </div>  
                 </div>
                 </div>
                ))
                 
            }
        </div>
    </>
  );
}

export default Internships;
