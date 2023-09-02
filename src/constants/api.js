import axios from 'axios'

const api = axios.create({
<<<<<<< HEAD
//  baseURL: 'http://43.228.126.245:5001',
baseURL: 'http://localhost:3001',
=======
// baseURL: 'http://43.228.126.245:5001',
baseURL: 'http://localhost:5001',
>>>>>>> f12a5f703346a03e36fd8a5798b7a9516d1a3811

});


// const loginApi = axios.create({
//   baseURL: 'https://art-cause.com:3003'
// });


export default api