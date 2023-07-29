import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../hooks';
import { userActions } from '../../Store/Users/userAction'; 


const Login = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    setLoading(true);
    dispatch(userActions.onSubmit(email, password))
      .then((data:any) => {
        if (data?.access_token) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("user_id", data.user.id);
          navigate('/dashboard');
        } else if (data?.response?.data?.detail) {
          setError(data?.response?.data?.detail);
        }
        setLoading(false);
      });
  };
 

  return (
    <form>
    <div className="form-outline mt-4 mb-4">
    <label className="form-label" htmlFor="form2Example11">Email</label>
      <input 
        type="email" 
        id="form2Example11" 
        className="form-control" 
        placeholder="Email address" 
        value={email}
        onChange={(e:any) => setEmail(e.target.value)}
      />
     
    </div>
    <div className="form-outline mb-4">
    <label className="form-label" htmlFor="form2Example22">Password</label>
      <input 
        type="password" 
        id="form2Example22" 
        className="form-control" 
        placeholder="Password" 
        value={password}
        onChange={(e:any) => setPassword(e.target.value)}
      />
      
    </div>
    <div className="text-center pt-1 mb-5 pb-1">
      <button 
        className="btn col-12 fa-lg gradient-custom-2 mb-3" 
        type="button"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Log in'}
      </button>
      <a className="text-muted" href="guest-register">Continue as Guest</a>
    </div>
    <div className="d-flex align-items-center justify-content-center pb-4">
      <p className="mb-0 me-2">Don't have an account?</p>
      <a href='register' type="button" className="btn btn-outline-dark">Create new</a>
    </div>
  </form>

  );
};

export default Login;
