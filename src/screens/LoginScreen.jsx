import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('facevedo@estudiantesdelaplata.com');
  const [password, setPassword] = useState('Felipe2022*');
  const [loading, setLoading] = useState(false);
  const [debugError, setDebugError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Por favor completá email y contraseña.');
      return;
    }

    try {
      setLoading(true);
      setDebugError('');

      console.log('Intentando login con:', { email, password });

      const response = await axiosInstance.post('/authentication/login', {
        email: email.trim(),
        password,
      });

      console.log('Respuesta del backend:', response.data);

      const token = response.data.access;
      const refresh = response.data.refresh || response.data.user?.refresh;
      const user = response.data.user;

      if (!token) throw new Error('Token no recibido del backend');

      await AsyncStorage.setItem('access', token);
      if (refresh) {
        await AsyncStorage.setItem('refresh', refresh);
      }
      await AsyncStorage.setItem('user', JSON.stringify(user));

      navigation.replace('Home');
    } catch (error) {
      console.log('Login error completo:', JSON.stringify(error, null, 2));

      let message = 'Error inesperado.';

      if (error.response) {
        message = error.response.data?.detail || JSON.stringify(error.response.data);
        setDebugError(JSON.stringify(error.response.data, null, 2));
      } else if (error.request) {
        message = 'No se recibió respuesta del servidor.';
      } else {
        message = 'Error al armar la solicitud: ' + error.message;
      }

      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#B80000" />
      ) : (
        <Button title="Ingresar" onPress={handleLogin} color="#B80000" />
      )}

      {debugError ? (
        <Text style={styles.debugText}>
          {debugError}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    textAlign: 'center',
    color: '#B80000',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    marginBottom: 20,
    padding: 12,
    borderRadius: 8,
  },
  debugText: {
    marginTop: 20,
    color: 'red',
    fontSize: 12,
  },
});
