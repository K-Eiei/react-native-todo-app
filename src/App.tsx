import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './navigations/AppNavigator';
import './global.css';

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
