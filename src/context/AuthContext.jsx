import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post('/authentication/login', { email, password });
      console.log('[AuthContext] Respuesta login:', res.data);

      const token = res.data.access || res.data.token;
      if (!token) throw new Error('Token no recibido');

      await AsyncStorage.setItem('access', token);
      setUser(res.data.user);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('access');
    setUser(null);
  };

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('access');
    if (token) {
      try {
        const res = await axiosInstance.get('/auth/me');
        setUser(res.data);
      } catch {
        await AsyncStorage.removeItem('access');
        setUser(null);
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
