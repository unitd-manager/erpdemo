import axios from 'axios'

const api = axios.create({
 baseURL: 'http://43.228.126.245:5001',
// baseURL: 'http://localhost:5001',

});




export default api