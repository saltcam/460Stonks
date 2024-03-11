// import React from 'react';
import navigate from "./Navigate";
import React, { useState, useEffect } from "react";
import axios from "axios";

function MyAccount() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(decodeURI("http://localhost:3000/"+ acc.userName))
            // console.log(response.data);

            navigate("/");
        } catch (err) {
            console.log("Error: " + err);
        }
    };

    const [ acc, setAcc] = useState({
        userName: "",
        pass: ""
    });

  return (
      <div className="container">
          <h1>My Account</h1>
          <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                  <label htmlFor="username">Username</label>
                  <p></p>
                  <input type="username" placeholder='Enter Username' name="userName"/>
              </div>
              <div className='mb-3'>
                  <label htmlFor="password">Password</label>
                  <p></p>
                  <input type="password" placeholder='Enter Password' name="password"/>
              </div>
              <button type="submit" className='btn btn-success'>Log in</button>
              <p></p>
              <button className='btn btn-success'>Create Account</button>
          </form>
          <p>Welcome to your account page. You can view your current buying power as well as all the stocks you
              currently own.</p>
          {/* Add more account-related content here */}
      </div>
  );
}

export default MyAccount;
