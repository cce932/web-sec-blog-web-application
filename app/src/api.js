import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export default instance;
