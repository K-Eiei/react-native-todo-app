import React from 'react';
import HomeScreen from '../screens/main';
import HelperScreen from '../screens/helper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions} from 'react-native';
import {useColorScheme} from 'nativewind';

const Drawer = createDrawerNavigator();
const screenWidth = Dimensions.get('window').width;

export default function AppNavigator() {
  const {colorScheme} = useColorScheme();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000',
        drawerPosition: 'left',
        swipeEdgeWidth: screenWidth,
        drawerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#111' : '#F0F0F0',
        },
        drawerLabelStyle: {
          color: colorScheme === 'dark' ? '#F0F0F0' : '#000',
        },
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Helper" component={HelperScreen} />
    </Drawer.Navigator>
  );
}
