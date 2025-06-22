import React from 'react';
import HomeScreen from '../screens/home';
import HelperScreen from '../screens/helper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions} from 'react-native';

const Drawer = createDrawerNavigator();
const screenWidth = Dimensions.get('window').width;

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000',
        drawerPosition: 'left',
        swipeEdgeWidth: screenWidth,
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Helper" component={HelperScreen} />
    </Drawer.Navigator>
  );
}
