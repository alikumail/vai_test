import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import { doctorActions } from '../../../../Store/Doctor/doctorAction';
import { userActions } from '../../../../Store/Users/userAction';
import { useAppDispatch } from '../../../../hooks';

interface Slot {
  start: string;
}

const AvailableSlots = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [patient, setPatient] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const users = [
    { value: 'user1', label: 'User 1' },
    { value: 'user2', label: 'User 2' },
    // Add more users as needed
  ];

  useEffect(() => {
    loadData();
  }, [startDate]);

  useEffect(() => {
    patientData();
  }, []);

  const loadData = () => {
    setLoading(true);
    dispatch(doctorActions.onSlots({ user: id , date: startDate }))
    .then((res: { availableSlots: Slot[] } | any) => {
      console.log(res);
      if (res?.availableSlots) {
        setAvailableSlots(res.availableSlots); // corrected line
      } 
      setLoading(false);
    }).catch(error => {
      setLoading(false);
      setError('An error occurred while fetching slots.');
    });
  };

  const patientData = () => {
    setLoading(true);
    dispatch(userActions.onGetUsers({userType:"Patient"})).then((res: any) => {
      if (res?.data) {
        setPatient(res?.data);
      }
      setLoading(false);
    });
  };

  const handleDateChange = (date: Date) => {
    setStartDate(date);
  };

  return (
    <div className="container">
<div className='row mt-3'>
  <div className='col-md-6'>
    <div className='user-area form-group'>
     <label htmlFor="patientSelect">Patients</label>
      <Select 
        id="patientSelect"
        options={users}
        isSearchable
        className='basic-multi-select'
        classNamePrefix="select"
      />
    </div>
  </div>
  <div className='col-md-6'>
    <div className='date-picker-area form-group'>
      <label htmlFor="datePicker">Date</label>
      <div id="datePicker">
        <DatePicker selected={startDate} onChange={handleDateChange} className='form-control' />
      </div>
    </div>
  </div>
</div>

      <div className="text-center my-4">
       
      </div>
      <div className="row">
        {availableSlots.map((hour: Slot) => (
          <div className='col-6 col-md-3 col-lg-2 mb-5'>
          <button key={hour.start} className="btn btn-primary">{`${hour.start}`}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableSlots;
