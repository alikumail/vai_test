import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { WorkingDay } from '../../../../types/WorkingDay';
import { useAppDispatch } from '../../../../hooks';
import { doctorActions } from '../../../../Store/Doctor/doctorAction';
import { useNavigate } from "react-router-dom";


const WorkingDays = () => {
    const [isLoading, setLoading] = useState<Boolean>(false);
    const [error, setError] = useState<string>('');

    const { id } = useParams<{ id: string }>();
  
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [workingSlots, setWorkingSlots] = useState<WorkingDay[]>(days.map(day => ({ workingDay: day, startTime: '00:00', workingHours: 0, isSelected: false })));

    const handleDayChange = (index: number, isSelected: boolean) => {
        const newWorkingDays = [...workingSlots];
        newWorkingDays[index].isSelected = isSelected;
        setWorkingSlots(newWorkingDays);
    };

    const handleTimeChange = (index: number, start: string) => {
        const newWorkingDays = [...workingSlots];
        newWorkingDays[index].startTime = start;
        setWorkingSlots(newWorkingDays);
    };

    const handleHoursChange = (index: number, hours: number) => {
        const newWorkingDays = [...workingSlots];
        newWorkingDays[index].workingHours = hours;
        setWorkingSlots(newWorkingDays);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        dispatch(doctorActions.onAddDoctor({
            user: id,
            workingDays: workingSlots
        }))
            .then((res: any) => {
                if (res?.doctor) {
                    navigate(`/dashboard/doctor/${id}/get-slots`);
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
        <div className='container mt-3'>
            <div className='card'>
                <div className='card-header'>Working Days and Hours</div>
                <div className='card-body'>
                    {workingSlots.map((workingDay, index) => (
                        <div key={index} className='working-day my-2'>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    id={`dayCheck${index}`}
                                    checked={workingDay.isSelected}
                                    onChange={(e) => handleDayChange(index, e.target.checked)}
                                />
                                <label className='form-check-label' htmlFor={`dayCheck${index}`}>
                                    {workingDay.workingDay}
                                </label>
                            </div>
                            <div className='mt-2 d-flex justify-content-start'>
                                <div className="input-group mb-3 mr-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id={`startHourLabel${index}`}>Start Time</span>
                                    </div>
                                    <input
                                        type="time"
                                        className="form-control"
                                        step="3600"
                                        aria-describedby={`startHourLabel${index}`}
                                        value={workingDay.startTime}
                                        onChange={(e) => handleTimeChange(index, e.target.value)}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id={`workingHoursLabel${index}`}>Working Hours</span>
                                    </div>
                                    <input
                                        type="number"
                                        min="0"
                                        max="24"
                                        className="form-control"
                                        aria-describedby={`workingHoursLabel${index}`}
                                        value={workingDay.workingHours}
                                        onChange={(e) => handleHoursChange(index, +e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="btn btn-primary mt-3" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default WorkingDays;
