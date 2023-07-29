import Main from "../pages/main";
import MainRegister from "../pages/main/Register";
import MainGuestRegister from "../pages/main/MainGuestRegister";


import Dashboard from "../pages/admin/";
import Users from "../pages/admin/users";
import CreateAdminUser from "../pages/admin/users/CreateAdminUser";
import ViewUser from "../pages/admin/users/ViewUser";

import GetDoctors from "../pages/doctors";

import DoctorWorking from "../pages/admin/doctors";
import GetSlots from "../pages/admin/doctors/GetSlots";

export const RoutesObj = {
  Main: {
    Path: '/',
    Component: Main, 
  },
  MainRegister: {
    Path: '/register',
    Component: MainRegister, 
  },
  MainGuestRegister: {
    Path: '/guest-register',
    Component: MainGuestRegister, 
  },
  GetDoctors: {
    Path: '/all-doctors',
    Component: GetDoctors, 
  },

    Dashboard: {
      Path: '/dashboard',
      Component: Dashboard, 
    },
    Users: {
      Path: '/dashboard/users',
      Component: Users, 
    },
    CreateAdminUser: {
      Path: '/dashboard/users/create',
      Component: CreateAdminUser, 
    },
    ViewUser: {
      Path: '/dashboard/users/view/:id',
      Component: ViewUser, 
    },

    DoctorWorking: {
      Path: '/dashboard/doctor/:id',
      Component: DoctorWorking, 
    },
    GetSlots: {
      Path: '/dashboard/doctor/:id/get-slots',
      Component: GetSlots, 
    },
  };
  
export default RoutesObj;
