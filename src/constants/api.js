import axios from 'axios';

const { hostname } = window.location;

let baseURL;

if (hostname === 'erpardemo.unitdtechnologies.com') {
  baseURL = 'https://erpardemo.unitdtechnologies.com:2020';
} else if (hostname === 'erpclient.unitdtechnologies.com') {
  baseURL = 'https://erpclient.unitdtechnologies.com:2011';
} else {
  baseURL = 'http://localhost:2005';
}

console.log('Selected Base URL:', baseURL);

const api = axios.create({
  baseURL,
});

export default api;