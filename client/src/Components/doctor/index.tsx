import React, { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Doctor } from "../../types/Doctor";
import { useAppDispatch } from '../../hooks';
import { doctorActions } from '../../Store/Doctor/doctorAction';

const GetDoctors = () => {

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');

  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    dispatch(doctorActions.onDoctors()).then((res: any) => {
      if (res?.data) {
        setDoctors(res?.data);
      }
      setLoading(false);
    });
  };


  return (
    <div className="user-detail-area">
      <div className="user-detail">
      <table className="table table-borderless">
          <thead>
            <tr>
            <th scope="col" className='mob-remove'>
                id
              </th>
              <th scope="col">
                Name
              </th>
              <th scope="col" >
               Email
              </th>
              <th scope="col" >Type</th>
              <th scope="col" >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((x, i) => {
              return (
                <tr key={i}>
                  <td >{x._id}</td>
                  <td >{x.name}</td>
                  <td >{x.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetDoctors;
