import axios from 'axios'

const api = axios.create({
// baseURL: 'http://43.228.126.245:5001',
baseURL: 'http://localhost:5001',

});


// const loginApi = axios.create({
//   baseURL: 'https://art-cause.com:3003'
// });


export default api