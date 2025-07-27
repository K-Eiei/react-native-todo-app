import {View, Text, Pressable} from 'react-native';
import {useState} from 'react';
import {useColorScheme} from 'nativewind';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import ThemeToggle from '../components/theme-toggle';
import AnimatedCheckbox from '../components/animated-checkbox';
import TaskItem from '../components/task-item';

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
  const [checked, setChecked] = useState(false);
  const [subject, setSubject] = useState('Task Item');
  const [isEditing, setIsEditing] = useState(false);
  const {colorScheme} = useColorScheme();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  // useAnimatedReaction(
  //   () => scale.value,
  //   (newValue, oldValue) => {
  //     console.log('🔁 scale changed from', oldValue, 'to', newValue);
  //   },
  //   [],
  // );

  const highlightColor = colorScheme === 'dark' ? '#60a5fa' : '#3b82f6';
  const boxStroke = colorScheme === 'dark' ? '#737373' : '#d4d4d4';

  return (
    <View className="flex-1 items-center justify-center bg-[#f8fafc] dark:bg-[#0f172a]">
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
      </Pressable>

      {/* <Switch  value={true} onValueChange={() => {} } /> */}
      <Pressable onPress={() => setChecked(!checked)}>
        <View className="w-10 h-10">
          <AnimatedCheckbox
            checked={checked} // หรือ false เพื่อเทส
            checkmarkColor={'white'}
            highlightColor={highlightColor}
            boxOutlineColor={boxStroke}
          />
        </View>
      </Pressable>
      <TaskItem
        isEditing={isEditing}
        isDone={checked}
        subject={subject}
        onToggleCheckbox={() => setChecked(!checked)}
        onChangeSubject={setSubject}
        onFinishEditing={() => setIsEditing(false)}
        onPressLabel={() => setIsEditing(true)}
        onRemove={() => console.log('remove')}
      />

      <Hstack />
      <ThemeToggle />
    </View>
  );
}
