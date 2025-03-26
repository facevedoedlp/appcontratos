// src/screens/DrawerContent.jsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function DrawerContent({ navigation }) {
  const { logout, user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estudiantes de La Plata</Text>
      <Text style={styles.subheader}>Bienvenido {user?.firstName} {user?.lastName}</Text>

      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.linkText}>🏠 Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.linkText}>📊 Contratos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Players')}>
        <Text style={styles.linkText}>⚽ Jugadores</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>🔓 Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B80000',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
  },
  link: {
    marginBottom: 20,
  },
  linkText: {
    color: '#fff',
    fontSize: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  logoutBtn: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#B80000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
