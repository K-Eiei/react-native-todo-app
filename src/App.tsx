import {NavigationContainer} from '@react-navigation/native';
import {usePersistentColorScheme} from './hooks/usePersistentColorScheme';
import {useColorScheme} from 'nativewind';
import {StatusBar} from 'react-native';
import Navigator from './navigations/AppNavigator';
import './global.css';

const AppContent = () => {
  const {colorScheme} = useColorScheme();
  usePersistentColorScheme(); // ✅ โหลด theme ที่เคยใช้ไว้
  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? '#000' : '#fff'}
      />
      <Navigator />
    </>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppContent />
    </NavigationContainer>
  );
}
