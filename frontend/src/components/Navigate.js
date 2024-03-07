import React from 'react';

function Navigate() {
  return (
    <>
      <nav className="navbar navbar-dark bg-primary mb-3">
        <div className="container">
          <a href="/#" className="navbar-brand">Stonk Street</a>
          <a href="/account" className="btn btn-secondary">My Account</a> {/* Update href to your account page URL */}
        </div>
      </nav>
    </>
  );
}

export default Navigate;
