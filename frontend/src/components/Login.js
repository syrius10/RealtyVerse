import React from 'react';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <a href="/api/auth/facebook">Login with Facebook</a>
        <a href="/api/auth/google">Login with Google</a>
      </div>
    </div>
  );
};

export default Login;