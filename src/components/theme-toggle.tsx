import {useColorScheme} from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Pressable, View, Text, LayoutChangeEvent} from 'react-native';
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

  const [trackWidth, setTrackWidth] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(0);

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
    // คำนวณระยะที่ thumb เคลื่อนจากซ้ายไปขวาสุด
    const padding = 2;
    const maxTranslate = trackWidth - thumbWidth - padding * 2;
    return {
      transform: [
        {
          translateX: progress.value * (maxTranslate > 0 ? maxTranslate : 0),
        },
      ],
    };
  });

  const onTrackLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const onThumbLayout = (e: LayoutChangeEvent) => {
    setThumbWidth(e.nativeEvent.layout.width);
  };

  return (
    <View className="flex flex-row items-center justify-center gap-2">
      <Text className="text-black dark:text-white">Dark</Text>

      <Pressable onPress={handleToggle}>
        <Animated.View
          onLayout={onTrackLayout}
          style={trackStyle}
          className="w-[52px] h-9 rounded-full p-[2px] justify-center bg-gray-500">
          <Animated.View
            onLayout={onThumbLayout}
            style={thumbStyle}
            className="h-[26px] w-[26px] rounded-full bg-[#f8fafc]"
          />
        </Animated.View>
      </Pressable>

      <Text className="text-black dark:text-white">Light</Text>
    </View>
  );
}
