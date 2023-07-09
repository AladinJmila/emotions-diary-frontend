import axios from 'axios';

export default axios.create({
  baseURL: 'https://emotions-diary-backend.onrender.com/api',
});
