import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const axiosInstance = axios.create({
  baseURL: 'https://zubeldia.estudiantesdelaplata.com/api',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access');
    console.log('[axiosconfig] TOKEN recuperado:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isLoginRequest = error.config?.url?.includes('/authentication/login');
    if (error.response && error.response.status === 401 && !isLoginRequest) {
      await AsyncStorage.removeItem('access');
      Alert.alert('Sesión expirada', 'Por favor, iniciá sesión nuevamente.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;