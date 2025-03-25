// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('access');
      setLoggedIn(!!token);
    };

    checkLogin();
  }, []);

  if (loggedIn === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#B80000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {loggedIn ? 'Estás logueado correctamente ✅' : 'No estás logueado ❌'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B80000',
    textAlign: 'center',
  },
});
