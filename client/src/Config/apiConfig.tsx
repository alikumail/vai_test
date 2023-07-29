
const host = "#";
const protocole = "https";

//export const rootURL = `${protocole}://${host}`;

 export const rootURL = "http://localhost:8000/api";
 
export const endpoints = {
  user: {
    users: `${rootURL}/users`,
    getUser: `${rootURL}/users/view`,
    login: `${rootURL}/users/login`,
    addUser: `${rootURL}/users/adduser`,
    registerUser: `${rootURL}/users/register`,
  },
  doctor: {
    doctors: `${rootURL}/doctors`,
    addDoctor: `${rootURL}/doctors`,
    getSlots: `${rootURL}/doctors/slots`,
  }
};

