import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

const AppliedAt = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({company_name: "", internship: "", location: "", duration: "", stipend: "",start_date: ""})
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
      console.log(data)
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
                // <div className = "internship col-md-10 col-12 mx-auto">
                // <div className ="internship_info">
                //     <p className ="company_name">{item.company_name}</p>
                //     <p className= "internship_name">{item.internship}</p>
                //     <p className = "location">{item.location}</p>
                //     <p className = "duration">{item.duration}</p>
                //     <p className = "stipend">{item.stipend}</p> 
                // </div>
                // </div>
                <div className = "internship col-md-10 col-12 mx-auto" style ={{marginTop: '30px'}}>
                  <div className ="internship_info">
                   {/* <ApplyInternship message = "message" /> */}
                   <div className= "internship_name">
                      <span>{item.internship}</span>
                   </div>
                   <div className ="company_name">
                    <span>{item.company_name}</span>
                   </div>
                  </div>
                     <div className="internshipdetails">
                        <div className="locationdetails" style = {{paddingTop:'20px'}}>
                          <i class='fas fa-map-marker-alt' style = {{color:'#8E9494'}}></i>
                            <span style={{fontSize: '15px',paddingLeft: '5px'}}>
                              {item.location}
                            </span>
                        </div>
                        {/* <div>

                        </div> */}
                        <div className="item_heading" style = {{paddingTop:'20px'}}>
                          <div className="item_detail">
                            <i class='far fa-calendar-check' style = {{color:'#8E9494'}}></i>
                              <span style={{fontSize: '14px',paddingLeft: '5px',color:'#8E9494'}}>
                                DURATION
                              </span>
                              <p>{item.duration}</p>
                          </div>
                          <div className="item_detail"  style = {{paddingLeft:'50px'}}>
                            <i class='fa fa-money' style = {{color:'#8E9494'}}></i>
                              <span style={{fontSize: '14px',paddingLeft: '5px',color:'#8E9494'}}>
                                STIPEND
                              </span>
                            <p>{item.stipend}</p>
                          </div>
                          {/* <div className="item_detail" style = {{paddingLeft:'50px'}}>
                            <i class='fas fa-hourglass-end' style = {{color:'#8E9494'}}></i>
                              <span style={{fontSize: '14px',paddingLeft: '5px',color:'#8E9494'}}>
                               APPLY BY
                              </span>
                              <p>{item.applyby}</p>
                          </div> */}
                          <div className="item_detail" style = {{paddingLeft:'50px'}}>
                            <i class='fa fa-caret-square-o-right' style = {{color:'#8E9494'}}></i>
                              <span style={{fontSize: '14px',paddingLeft: '5px',color:'#8E9494'}}>
                                START DATE
                              </span>
                            <p>{item.start_date}</p>
                          </div>
                          <div className="item_detail" style = {{paddingLeft:'50px'}}>
                            <i class='far fa-clock' style = {{color:'#8E9494'}}></i>
                              <span style={{fontSize: '14px',paddingLeft: '5px',color:'#8E9494'}}>
                                TYPE
                              </span>
                            <p>{item.worktype}</p>
                          </div>
                        </div>
                        
                      </div>
                     {/* <div className ="applydetails" style ={{marginBottom: '30px'}}>
                     <Link exact className="detaillink" style={{ color: '#315F8D',fontSize: '16px',textDecoration: 'none',fontWeight:'600'}}  to={{
                          pathname: "/applyinternship",
                          state: {
                            job_id: item._id,
                            company_name: item.company,}}}>Apply Now
                          <i class='fas fa-angle-right' style = {{color: '#315F8D',paddingLeft:'5px'}}></i>
                          </Link>
                          
                     </div>   */}
                 </div>
            ))         
        }
        
    </>
  );
}

export default AppliedAt;
