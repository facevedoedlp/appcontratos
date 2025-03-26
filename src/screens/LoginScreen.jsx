import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('facevedo@estudiantesdelaplata.com');
  const [password, setPassword] = useState('Felipe2022*');
  const [loading, setLoading] = useState(false);
  const [debugError, setDebugError] = useState('');

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Por favor completá email y contraseña.');
      return;
    }

    try {
      setLoading(true);
      setDebugError('');
      console.log('Intentando login con:', { email, password });

      await login(email.trim(), password);
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
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      {loading ? (
        <ActivityIndicator size="large" color="#B80000" />
      ) : (
        <Button title="Ingresar" onPress={handleLogin} color="#B80000" />
      )}
      {debugError ? <Text style={styles.debugText}>{debugError}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  title: { fontSize: 26, marginBottom: 30, textAlign: 'center', color: '#B80000', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#999', marginBottom: 20, padding: 12, borderRadius: 8 },
  debugText: { marginTop: 20, color: 'red', fontSize: 12 },
});