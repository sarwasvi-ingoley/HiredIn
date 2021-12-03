import React, { useEffect, useContext } from "react";
import {useHistory} from "react-router-dom";
import {UserContext} from "../App";

const Logout = () => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    // promises
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            dispatch({type: "USER", payload: false})
            history.push('/login', {replace: true});
            if(res.status != 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })
    });
    return (
      <div className="text-center mt-5">
        <h1>Logout Page</h1>
      </div>
    );
  };
  
  export default Logout;