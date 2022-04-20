import axios from 'axios';
import { useProfileContext } from './useProfile';

const useAuthenticApi = () => {
  const { profile } = useProfileContext();

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': 'Authorization',
    },
  });

  instance.defaults.headers.common['Authorization'] = profile?.id ? profile?.id : undefined; // or directly define in headers when creating

  return instance;
};
export default useAuthenticApi;
