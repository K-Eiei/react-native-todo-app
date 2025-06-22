import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import HelperScreen from '../screens/helper';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        // options={{title: 'Welcome'}}
      />
      <Stack.Screen
        name="Helper"
        component={HelperScreen}
        // options={{title: 'Welcome'}}
      />
    </Stack.Navigator>
  );
}
