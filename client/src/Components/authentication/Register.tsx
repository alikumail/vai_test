import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../hooks';
import { userActions } from '../../Store/Users/userAction'; 

const Register = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    setLoading(true);
    if(password === confirmPassword){
        dispatch(userActions.onRegisterUser({name:name, email:email,password:password, userType: "Patient"}))
          .then((data:any) => {
            if (data?.access_token) {
              localStorage.setItem("access_token", data.access_token);
              localStorage.setItem("user_id", data.data._id);
              navigate('/dashboard');
            } else if (data?.response?.data?.detail) {
              setError(data?.response?.data?.detail);
            }
            setLoading(false);
          });
    }
    else{
        setError('Passwords do not match');
        setLoading(false);
    }
  };

  return (
    <form>
    <div className="form-outline mt-4 mb-4">
    <label className="form-label" htmlFor="form2Example1">Name</label>
      <input 
        type="text" 
        id="form2Example1" 
        className="form-control" 
        placeholder="Your name" 
        value={name}
        onChange={(e:any) => setName(e.target.value)}
      />
     
    </div>
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
    <div className="form-outline mb-4">
    <label className="form-label" htmlFor="form2Example23">Confirm Password</label>
      <input 
        type="password" 
        id="form2Example23" 
        className="form-control" 
        placeholder="Confirm Password" 
        value={confirmPassword}
        onChange={(e:any) => setConfirmPassword(e.target.value)}
      />
      
    </div>
    <div className="text-center pt-1 mb-5 pb-1">
      <button 
        className="btn col-12 fa-lg gradient-custom-2 mb-3" 
        type="button"
        onClick={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Register'}
      </button>
      <a className="text-muted" href="guest-register">Continue as Guest</a>

    </div>
    <div className="d-flex align-items-center justify-content-center pb-4">
      <p className="mb-0 me-2">Already have an account?</p>
      <a href="/" className="btn btn-outline-dark">Log in</a>
    </div>
  </form>
  );
};

export default Register;
