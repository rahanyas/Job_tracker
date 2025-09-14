import Axios from 'axios';
const baseUrl = import.meta.env.VITE_ENV==='dev'?import.meta.env.VITE_DEV_BACK_URL : import.meta.env.VITE_PROD_BACK_URL;

console.log('base url for axios : ', baseUrl)
const axios = Axios.create({
  baseURL : baseUrl,
  headers : {
    "Content-Type" : "multipart/form-data"
  }
});

export default axios;