// src/screens/PlayersScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import axiosInstance from '../services/api';
import { useNavigation } from '@react-navigation/native';

const PlayersScreen = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await axiosInstance.get('/players/');
      console.log('[PlayersScreen] Datos:', res.data);
      setPlayers(res.data.items || []); // ✅ CORREGIDO: antes decía `results`
    } catch (error) {
      console.error('Error al obtener jugadores:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPlayer = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        // Podés navegar a detalle o edición acá
      }}
    >
      <Text style={styles.name}>{item.fullName}</Text>
      <Text style={styles.info}>Nacionalidad: {item.nacionality || 'N/D'}</Text>
      <Text style={styles.info}>Disciplina: {item.discipline || 'N/D'}</Text>
      <Text style={styles.info}>Categoría: {item.category || 'N/D'}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#B80000"
        style={{ marginTop: 40 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlayer}
        ListEmptyComponent={<Text>No se encontraron jugadores.</Text>}
      />
    </View>
  );
};

export default PlayersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B80000',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: '#333',
  },
});
