import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import { RoutesObj } from './RoutesObj';
import NotFoundPage from '../Components/_App/NotFoundPage';

function Routers() {
  const authComponent = (componentObj : any) => {

    const isAccessToken = localStorage.getItem("access_token");
    if (isAccessToken) {
      return componentObj;
    } else {
      return <Navigate to="/" replace />
    }
  };


  return (
      <Routes>
        <Route path={RoutesObj.Main.Path} 
        element={<RoutesObj.Main.Component />} /> 
        <Route path={RoutesObj.MainRegister.Path} 
        element={<RoutesObj.MainRegister.Component />} /> 
        <Route path={RoutesObj.MainGuestRegister.Path} 
        element={<RoutesObj.MainGuestRegister.Component />} /> 

        <Route path={RoutesObj.GetDoctors.Path} 
        element={<RoutesObj.GetDoctors.Component />} /> 

        <Route path={RoutesObj.Dashboard.Path} 
        element={authComponent(<RoutesObj.Dashboard.Component />)} /> 
        <Route path={RoutesObj.Users.Path} 
        element={authComponent(<RoutesObj.Users.Component />)} /> 
        <Route path={RoutesObj.CreateAdminUser.Path} 
        element={authComponent(<RoutesObj.CreateAdminUser.Component />)} /> 
        <Route path={RoutesObj.ViewUser.Path} 
        element={authComponent(<RoutesObj.ViewUser.Component />)} /> 

        <Route path={RoutesObj.DoctorWorking.Path} 
        element={authComponent(<RoutesObj.DoctorWorking.Component />)} /> 
       <Route path={RoutesObj.GetSlots.Path} 
        element={authComponent(<RoutesObj.GetSlots.Component />)} /> 
        <Route  path="*" element={<NotFoundPage />} /> 
      </Routes>
  );
}

export default Routers;
