import axios from 'axios';

// // Define the base URL(s) conditionally
let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://43.228.126.245:5001';
} else {
  baseURL = 'http://localhost:5001';
}

console.log('NODE_ENV:', process.env.NODE_ENV);
const api = axios.create({
<<<<<<< HEAD
 //baseURL: 'http://43.228.126.245:5001',
 baseURL: 'http://localhost:5001',

=======
  baseURL, // Use the baseURL variable here
>>>>>>> bd2a64e0aed9c06c342450af73b481aa01f2be36
});

export default api;
