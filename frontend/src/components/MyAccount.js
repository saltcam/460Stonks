import React from 'react';

function MyAccount() {

  return (
      <div className="container">
          <h1>My Account</h1>
          <form action="">
              <div className='mb-3'>
                  <label htmlFor="username">Username</label>
                  <p></p>
                  <input type="username" placeholder='Enter Username'/>
              </div>
              <div className='mb-3'>
                  <label htmlFor="password">Password</label>
                  <p></p>
                  <input type="password" placeholder='Enter Password'/>
              </div>
              <button className='btn btn-success'>Log in</button>
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
