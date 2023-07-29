import React, { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import { User } from "../../../types/User";
import { useAppDispatch } from '../../../hooks';
import { userActions } from '../../../Store/Users/userAction';

const GetUser = () => {
  const [user, setUser] = useState<User>({
    _id : '',
    userType: '',
    email: '',
    password: '',
    name: '',
  });
  
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');

  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    dispatch(userActions.onGetUser({userId:id})).then((res: any) => {
      if (res?.data) {
        setUser(res?.data);
      }
      setLoading(false);
    });
  };

  return (
    <div className="user-detail-area">
      <div className="user-detail">
      <table className="table table-borderless">
          <tbody>
             <tr>
              <th>ID</th>
               <td >{user._id}</td>
            </tr>
            <tr>
            <th>Name</th>
            <td >{user.name}</td>
            </tr>
            <tr>
            <th>Email</th>
            <td >{user.email}</td>
              </tr>
              <tr>
              <th>User Type</th>
              <td >{user.userType}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetUser;
