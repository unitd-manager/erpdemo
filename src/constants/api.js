import axios from 'axios';

// Define the base URL(s) conditionally
let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://43.228.126.245:5001';
} else {
  baseURL = 'http://localhost:5001';
}

const api = axios.create({
  baseURL, // Use object shorthand notation here
});

export default api;
