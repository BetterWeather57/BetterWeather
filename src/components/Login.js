import React from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className='login-container'>
       Login
      <form method="POST" action='/login'>
      <input name="username" type="text" placeholder="username"></input>
      <input name="password" type="password" placeholder="password"></input>
      <input type='submit' value="login"></input>
      </form>
      <Link to='./signup'>Sign up</Link>
   </div>
  )
}


