import AsyncStorage from '@react-native-async-storage/async-storage';

useEffect(() => {
  AsyncStorage.getItem('access').then(token => {
    console.log('[DashboardScreen] TOKEN en storage:', token);
  });
}, []);
