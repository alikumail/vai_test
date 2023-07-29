import React from 'react';
import { useNavigate } from "react-router-dom";
import { TextLeft } from 'react-bootstrap-icons';
import { TextRight } from 'react-bootstrap-icons';


function Header({showMenu, setShowMenu} : any) {

   const handleMenu = () => {
        setShowMenu(!showMenu);
  };
  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");          
    localStorage.removeItem("user_id");
    navigate('/');
  };
  
  return (
    <header className="navbar navbar-dark sticky-top gradient-custom-2  flex-md-nowrap p-0 shadow">
      <a className="navbar-brand  col-md-3 col-lg-2 me-0 px-3" href="/">
        <img src='/assets/images/logolight.png' className='dashborad-logo' alt="Brand" />
      </a>
      <div className="navbar-nav d-none d-md-block d-lg-block">
        <div className="nav-item text-nowrap ">
          <button className="nav-link px-3" onClick={handleSignout}>Sign out</button>
        </div>
      </div>
      <span className='toggale-b d-md-none' onClick={handleMenu}>
       {showMenu ? (<TextLeft className='icon' size={30} />) : (<TextRight className='icon' size={30} />) }
    </span>
    </header>
  );
}

export default Header;
