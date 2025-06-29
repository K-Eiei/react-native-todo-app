// components/ThemeToggle.tsx
import {useColorScheme} from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {Pressable, View, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

export default function ThemeToggle() {
  const {colorScheme, setColorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';

  const progress = useSharedValue(isDark ? 0 : 1);

  useEffect(() => {
    progress.value = withTiming(isDark ? 0 : 1, {duration: 200});
  }, [isDark]);

  const handleToggle = async () => {
    const newTheme = isDark ? 'light' : 'dark';
    setColorScheme(newTheme);
    await AsyncStorage.setItem('APP_THEME', newTheme);
  };

  const trackStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ['#4b5563', '#5578AA'],
      ),
    };
  });

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: progress.value * 22, // ปรับตำแหน่งตาม progress (จาก 0 → 24)
        },
      ],
    };
  });

  return (
    <View className="flex flex-row items-center justify-center gap-2">
      <Text className="dark:color-white">Dark</Text>
      <Pressable onPress={handleToggle}>
        <Animated.View
          style={trackStyle}
          className="w-[52px] h-9 rounded-full p-[2px] justify-center">
          <Animated.View
            style={thumbStyle}
            className={'w-[26px] h-[27px] rounded-full bg-white'}
          />
        </Animated.View>
      </Pressable>
      <Text className="dark:color-white">Light</Text>
    </View>
  );
}
