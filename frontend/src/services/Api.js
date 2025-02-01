import axios from 'axios';
import config from '../../config';

const fetchData = axios.create({
  baseURL: `${config.apiBaseUrl}/`,
  withCredentials: true,
});

export default fetchData;