import React, { useState } from "react";
import { User } from "../../../types/User";
import { useAppDispatch } from '../../../hooks';
import { userActions } from '../../../Store/Users/userAction';
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [user, setUser] = useState<User>({
    _id : '',
    userType: 'Admin',
    email: '',
    password: '',
    name: '',
  });

  const [isLoading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(userActions.onAddUser(user))
    .then((res: any) => {
      console.log(res);
      if (res?.data) {
        if(user.userType==='Doctor') {
          navigate(`/dashboard/doctor/${res.data._id}`);
        } else {
          navigate('/dashboard/users');
        }
        
      }
      else {
        throw new Error("User data not available");
      }
    })
    .then((res: any) => {
      console.log(res);
    })
    .catch(err => {
      setError(err.toString());
      setLoading(false);
    });
  

  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Name:</label>
          <input className="form-control" type="text" name="name" value={user.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>User Type:</label>
          <select className="form-control" name="userType" value={user.userType} onChange={handleChange}>
            <option value="Admin">Admin</option>
            <option value="Doctor">Doctor</option>
            <option value="Patient">Patient</option>
          </select>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input className="form-control" type="email" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input className="form-control" type="password" name="password" value={user.password} onChange={handleChange} required />
        </div>
 
        <button className="btn btn-primary mt-3" type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
