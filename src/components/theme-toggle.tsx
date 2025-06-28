// components/ThemeToggle.tsx
import {useColorScheme} from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Pressable, Text} from 'react-native';

export default function ThemeToggle() {
  const {colorScheme, setColorScheme} = useColorScheme();

  const handleToggle = async () => {
    const newTheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newTheme);
    await AsyncStorage.setItem('APP_THEME', newTheme); // ✅ save ไว้
  };

  return (
    <Pressable
      onPress={handleToggle}
      className="mt-4 p-2 bg-gray-300 dark:bg-gray-700 rounded">
      <Text className="text-black dark:text-white">
        Switch to {colorScheme === 'light' ? 'Dark' : 'Light'} Mode
      </Text>
    </Pressable>
  );
}
