import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
// import SearchFeature from "./Search";
//  import {getInternship} from "../actions/internshipaction"


const Internships= ({onLocationFilter}) => {
  const history = useHistory();
  const [userData, setUserData] = useState({})
  const[SearchTerm, setSearchTerm]= useState("");
  const[LocTerm, setLocTerm]= useState("");
  const [data, getData] = useState(null);
  const [filters,setFilters] = useState({
    filterlocation: "",
  })
  const handleInput = (field) => (event) =>{
    const {value} =event.target;
    setFilters({
      ...filters,
      [field]: value,
    });
    switch(field){
      case "filterlocation":
        onLocationFilter(value);
        // setLocTerm(value);
        break;
      default:
        break;
    }
  }
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
      // console.log(data);
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
  


    async function getAllData() {
        const response = await fetch('/api/v1/getinternships')
        const data = await response.json()
        console.log(data)
        getData(data)
    }
    // const handleFilterLocation = async(location) => {
    //   const response = await fetch('/api/v1/getinternships')
    //   const data = await response.json()
    //   console.log(data)
    //   setData(data)
    //   const filteredData = data.display_internships.filter((item) => {
    //     if(item.location.toLowerCase().includes(location.toLowerCase())){
    //       return item
    //     }
    //   });
    //   setData(filteredData);
    //   console.log(filteredData)
    // }
  
    if(data == null) {
        return <p>Loading...</p>
    }
   
  

  return (
    <>
     <div className ="container-fluid">
              <div className ="row">
                      <div className= "col-md-8 mx-auto" style ={{marginTop: '30px',paddingLeft: '10px'}}>

                        <input type="text" id="filterinternshiptype"  placeholder="Internship Type" className= "prompt" style ={{width: '900px', height: '35px'}} onChange ={(e) => setSearchTerm(e.target.value)}/>
                        {/* <input type="text" id="filterdata"  placeholder="Location" className= "prompt" onChange ={(e) => setLocTerm(e.target.value)}/> */}
                       
                      </div>   
                      <div className= "col-md-8 mx-auto" style ={{marginTop: '30px',paddingLeft: '10px'}}>

                       
                       {/* <input type="text" id="filterlocation"  placeholder="Location" className= "prompt" onChange ={handleInput("filterlocation")}/> */}
                      <input type="text" id="filterlocation"  placeholder="Location" className= "prompt" style ={{width: '900px', height: '35px'}} onChange ={(e) => setLocTerm(e.target.value)}/>
           
        </div>
              </div>
            {
                data.display_internships.filter((value,valuein) => {
                  if(SearchTerm === "" && LocTerm ===""){
                    console.log("hello")
                    return value
                  }else if(SearchTerm != "" && LocTerm ===""
                  ){
                    console.log(SearchTerm)
                    return value.internship.toLowerCase().includes(SearchTerm.toLowerCase())
                  }else if(SearchTerm === "" && LocTerm !="")
                  {
                    console.log("hello")
                    return value.location.toLowerCase().includes(LocTerm.toLowerCase())
                   }
                   else if(value.internship.toLowerCase().includes(SearchTerm.toLowerCase()) && value.location.toLowerCase().includes(LocTerm.toLowerCase()))
                  {
                    console.log("hello")
                    return value
                    // return value.internship.toLowerCase().includes(SearchTerm.toLowerCase())
                  }
                })

                .map((item)=>(
                // <Link className="internshipCard" to={`/internship/${internship._id}`}>
                <div className = "internship col-md-10 col-12 mx-auto">
                 <div className ="internship_info">
                   {/* <ApplyInternship message = "message" /> */}
                     <p className ="company_name">{item.company}</p>
                     <p className= "internship_name">{item.internship}</p>
                     <div className="row">
                        <p className = "location">{item.location}</p>
                        <p className = "stipend">{item.stipend}</p>
                        <p className = "work_type">{item.work_type}</p>
                     </div>
                    
                     <div className ="applydetails" style ={{marginBottom: '30px'}}>
                     {/* <Link exact className="detaillink" style={{ color: '#022b2b'}}  to={{
                          pathname: "/applyinternship",
                          state: item._id}}>Apply Now</Link> */}
                      <Link exact className="detaillink" style={{ color: '#022b2b'}}  to={{
                          pathname: "/applyinternship",
                          state: {
                            job_id: item._id,
                            company_name: item.company,}}}>Apply Now</Link>
                     </div>  
                 </div>
                </div>
                // </Link> 
              ))         
            }
            
             
        </div>
    </>
  );
}

export default Internships;


// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { Link } from 'react-router-dom';

// function Internships() {
//   const history = useHistory();
//   const [userData, setUserData] = useState({})
//   const [data, getData] = useState(null);
//   const callInternshipPage = async() => {
//     try {
//       const res =  await fetch('/internships', {
//         method: 'GET',
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         credentials: "include"
//       });
//       const data = await res.json();
//       console.log(data);
//       setUserData(data);
//       if(! res.status === 200) {
//         const error = new Error(res.error);
//         throw error;
//       } else {
//         // getAllData();
//       }
//     } catch(err) {
//       console.log(err);
//       history.push('/login'); 
//     }
//   }
//   useEffect(() => {
//     callInternshipPage();
//     getAllData();
//   }, []);
  
//     async function getAllData() {
//         const response = await fetch('/api/v1/getinternships')
//         const data = await response.json()
//         console.log(data)
//         getData(data)
//     }

//     if(data == null) {
//         return <p>Loading...</p>
//     }
//     const handleSearch = e => {
//       setText(e.target.value);
//       dispatch(getInternshipsByFilter({type: Text}))
//     }
  

//   return (
//     <>
//      <div className ="container-fluid">
//               <div className ="row">
//                   <form style = {{display: 'flex'}}>
//                       <div className= "col-md-8 mx-auto" style ={{marginTop: '30px',paddingLeft: '170px'}}>
//                         {/* <label for="exampleFormControlInput1" class="form-label">Full Name</label> */}
//                         <input type="text" class="form-control" name = "name" id="filterdata"  placeholder="Internship Type" required/>
//                         {/* <button class="btn btn-primary" type="submit" style ={{float: 'right'}}>Search</button> */}
//                       </div>
//                       <div className ="col-md-4 mx-auto" style ={{float: 'right',marginTop: '30px'}}>
//                         <button class="btn btn-primary" type="submit">Search</button>
//                      </div>
//                   </form>
//               </div>
//             {
//                 data.display_internships.map((item)=>(
                
//                 <div className = "internship col-md-10 col-12 mx-auto">
//                  <div className ="internship_info">
//                    {/* <ApplyInternship message = "message" /> */}
//                      <p className ="company_name">{item.company}</p>
//                      <p className= "internship_name">{item.internship}</p>
//                      <p className = "stipend">{item.stipend}</p>
//                      <div className ="viewintrndetails" style ={{marginBottom: '30px'}}>
//                      <Link exact className="detaillink" style={{ color: '#022b2b'}}  to={{
//                           pathname: "/applyinternship",
//                           state: item._id}}>Apply Now</Link>
//                      </div>  
//                  </div>
//                  </div>
                 
//               ))         
//             }
//         </div>
//     </>
//   );
// }

// export default Internships;
