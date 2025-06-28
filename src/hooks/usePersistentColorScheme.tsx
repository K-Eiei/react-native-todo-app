import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useColorScheme} from 'nativewind';

export const usePersistentColorScheme = () => {
  const {setColorScheme} = useColorScheme();

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('APP_THEME');
      if (saved === 'light' || saved === 'dark') {
        setColorScheme(saved);
      }
    };
    loadTheme();
  }, []);
};
