import axios from 'axios';

const fetchData = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api` || 'http://localhost:5000/api',
});

export default fetchData;