import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './src/components/CustomButton';
import CustomInput from './src/components/CustomInput';
import { useState } from 'react';
import RegisterScreen from './src/screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { navigationRef } from './src/navigation/NavigationService';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './src/store';


export default function App() {
  return(
    <ThemeProvider>
      <AuthProvider>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            <StackNavigator/>
          </NavigationContainer>
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  );
}

