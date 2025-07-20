import React, {useCallback} from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {useColorScheme} from 'nativewind';
import AnimatedCheckbox from '../components/animated-checkbox';
import {Pressable, TextInput} from 'react-native-gesture-handler';

interface Props {
  simultaneousHandlers?: React.Ref<any> | React.Ref<any>[];
  isEditing: boolean;
  isDone: boolean;
  onToggleCheckbox?: () => void;
  onPressLabel?: () => void;
  onRemove?: () => void;
  onChangeSubject?: (subject: string) => void;
  onFinishEditing?: () => void;
  subject: string;
}

export default function TaskItem(props: Props) {
  const {
    isEditing,
    isDone,
    onToggleCheckbox,
    subject,
    onPressLabel,
    onRemove,
    onChangeSubject,
    onFinishEditing,
    simultaneousHandlers,
  } = props;

  const {colorScheme} = useColorScheme();

  const highlightColor = colorScheme === 'dark' ? '#60a5fa' : '#3b82f6';
  const boxStroke = colorScheme === 'dark' ? '#737373' : '#d4d4d4';
  const checkmarkColor = colorScheme === 'dark' ? 'white' : 'white';

  const doneTextColor = colorScheme === 'dark' ? '#525252' : '#a3a3a3';

  const handleChangeSubject = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeSubject && onChangeSubject(e.nativeEvent.text);
    },
    [onChangeSubject],
  );

  return (
    <View className="w-full px-4 py-2 flex flex-row items-center bg-[#fafaf9] dark:bg-[#164e63]">
      <View className="w-[120px]_ h-[120px]_ w-8 h-10 me-2">
        <Pressable onPress={onToggleCheckbox}>
          <AnimatedCheckbox
            checked={isDone}
            checkmarkColor={checkmarkColor}
            highlightColor={highlightColor}
            boxOutlineColor={boxStroke}
          />
        </Pressable>
      </View>
      <TextInput
        className="text-[19px] px-1 py-0 text-black dark:text-white"
        value={subject}
        placeholder="Task"
        autoFocus
        onChange={handleChangeSubject}
        onBlur={onFinishEditing}
      />
    </View>
  );
}
