// src/navigation/AppNavigator.jsx
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import PlayersScreen from '../screens/PlayersScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DrawerContent from '../screens/DrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AppDrawer = () => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}
    screenOptions={{ headerShown: true }}>
    <Drawer.Screen name="Inicio" component={HomeScreen} />
    <Drawer.Screen name="Contratos" component={DashboardScreen} />
    <Drawer.Screen name="Jugadores" component={PlayersScreen} />
  </Drawer.Navigator>
);

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="App" component={AppDrawer} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
