import React from 'react';
import '../stylesheets/SignupForm.css';

// this is a fake form that does not collect any data!!
export const Signup = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = '/app';
  }

  return (
    <div>
      <div className="signup-form-container">
        Signup for Better Weather
        <form onSubmit={handleSubmit}>
          <input name="username" type="text" placeholder="username"></input>
          <input name="mother's maiden name" type="text" placeholder="mother's maiden name"></input>
          <input name="social security number" placeholder="social security number" type="number"></input>
          <input name="password" type="password"></input>
          <input type="submit" value="create user"></input>
        </form>
      </div>
    </div>
  )
}