import axios from 'axios';


// // Define the base URL(s) conditionally
// let baseURL;

// if (process.env.NODE_ENV === 'production') {
//   baseURL = 'https://erpardemo.unitdtechnologies.com:2006';
// } else {
//   baseURL = 'http://localhost:2005';
// }

// console.log('NODE_ENV:', process.env.NODE_ENV);
// const api = axios.create({
//   baseURL, // Use the baseURL variable here
// });


// export default api;


const api = axios.create({
  //baseURL: 'http://43.228.126.245:3007',
  baseURL: 'http://localhost:2005',
  
  
  });

export default api;




