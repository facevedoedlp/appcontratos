import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlayersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Listado de jugadores</Text>
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
    color: '#B80000',
  },
});
