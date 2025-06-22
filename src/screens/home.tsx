import {View, Text, Pressable, Switch, StatusBar} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {useColorScheme} from 'nativewind';

const Hstack = () => {
  return (
    <View className="flex flex-col gap-1 items-center">
      <Text className={'dark:text-white'}>Test</Text>
      <Text className={'dark:text-white'}>Test</Text>
      <Text className={'dark:text-white'}>Test</Text>
      <Text className={'dark:text-white'}>Test</Text>
    </View>
  );
};

export default function HomeScreen({navigation}: {navigation: any}) {
  const {colorScheme, toggleColorScheme} = useColorScheme();

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  useAnimatedReaction(
    () => scale.value,
    (newValue, oldValue) => {
      console.log('🔁 scale changed from', oldValue, 'to', newValue);
    },
    [],
  );

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />

      <Text className="text-green-400 text-3xl mb-4">Home Screen Jin</Text>

      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.95);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={() => navigation.navigate('Helper')}>
        <Animated.View
          style={animatedStyle}
          className="bg-blue-500 px-4 py-2 rounded-full">
          <Text className="text-white font-bold text-sm text-center">
            GO TO HELPER
          </Text>
        </Animated.View>
        <Hstack />

        <Switch value={colorScheme === 'dark'} onChange={toggleColorScheme} />
      </Pressable>
    </View>
  );
}
