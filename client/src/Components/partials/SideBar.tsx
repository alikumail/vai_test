import React, { useState,useEffect } from "react";
import { User } from "../../types/User";
import { useAppDispatch } from '../../hooks';
import { userActions } from '../../Store/Users/userAction';


function Sidebar({showMenu} : any) {
  const [user, setUser] = useState<User>({
    _id : '',
    userType: '',
    email: '',
    password: '',
    name: '',
  });

  const [isLoading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');


  const dispatch = useAppDispatch();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    const user_id = localStorage.getItem("user_id");
    dispatch(userActions.onGetUser({userId:user_id})).then((res: any) => {
      if (res?.data) {
        setUser(res?.data);
      }
      setLoading(false);
    });
  };

  return (
    <>

    <nav id="sidebarMenu" className={`col-md-3 col-lg-2 d-md-block bg-dark sidebar ${showMenu ? ("show"): ("")}`}>
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          {user.userType==="Admin" ? (
            <>
          <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/dashboard">
            <span data-feather="home"></span>
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/users">
            <span data-feather="file"></span>
            Users
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/users">
            <span data-feather="file"></span>
            Doctors
          </a>
        </li>
        </>
          ) : null }
          <li className="nav-item">
            <a className="nav-link" href="/appoinments">
              <span data-feather="file"></span>
              Appointments
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/setting">
              <span data-feather="file"></span>
              Setting
            </a>
          </li>

        </ul>

      </div>
    </nav>
    </>
  );
}

export default Sidebar;
