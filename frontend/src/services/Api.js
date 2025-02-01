import axios from 'axios';
import config from '../../config';

const fetchData = axios.create({
  baseURL: `${config.apiBaseUrl}/`,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
});

export default fetchData;