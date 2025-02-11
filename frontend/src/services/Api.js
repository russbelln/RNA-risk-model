import axios from 'axios';
import config from '../../config';

const fetchData = axios.create({
  baseURL: `${config.apiBaseUrl}/`
  httpsAgent: new (require('https').Agent)({  
    rejectUnauthorized: false  // Permitir certificados autofirmados
  })
});

export default fetchData;