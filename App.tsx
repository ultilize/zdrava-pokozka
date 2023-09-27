import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screens/camera';
import Tabs from './navigation/tabs';
import Toast from 'react-native-toast-message';

import { fonts } from './lib/fonts';
import LoadingScreen from './components/LoadingScreen';
import { useFonts } from '@expo-google-fonts/poppins';
import { Camera } from 'expo-camera';
import HomeScreen from './screens/home';
import PredictionScreen from './screens/prediction';

const Stack = createNativeStackNavigator();

const App = () => {
  let [fontsLoaded, error] = useFonts(fonts);

  React.useEffect(() => {
    const getPerms = async () => {
    
      await Camera.requestCameraPermissionsAsync();
  
    }
    getPerms();
  }, [])
  

  const loading = !fontsLoaded;

  if (loading) return <LoadingScreen />

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen options={{
          headerShown: true,
          headerTitle: 'Späť',
          
        }} name="Prediction" component={PredictionScreen} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
