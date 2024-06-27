import axios from 'axios';

const { hostname } = window.location;
console.log('Current Hostname:', hostname);
console.log('Production URL:', process.env.REACT_APP_PRODUCTION_URL);
console.log('Test URL:', process.env.REACT_APP_TEST_URL);
console.log('Local URL:', process.env.REACT_APP_LOCAL_URL);

let baseURL;

if (hostname === 'erpardemo.unitdtechnologies.com') {
  baseURL = 'https://erpardemo.unitdtechnologies.com:2020';
} else if (hostname === 'erpclient.unitdtechnologies.com') {
  baseURL = 'https://erpclient.unitdtechnologies.com:2010';
} else {
  baseURL = 'https://erpardemo.unitdtechnologies.com:2020';
}

console.log('Selected Base URL:', baseURL);

const api = axios.create({
  baseURL,
});

export default api;