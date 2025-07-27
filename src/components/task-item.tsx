import React, {ComponentType, RefObject, useCallback} from 'react';
import AnimatedCheckbox from '../components/animated-checkbox';
import AnimatedTaskLabel from './animated-task-label';
import SwipableView from './swipable-view';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {GestureType, Pressable, TextInput} from 'react-native-gesture-handler';
import {useColorScheme} from 'nativewind';

type SimultaneousHandlerType =
  | GestureType
  | RefObject<GestureType | undefined>
  | RefObject<ComponentType<{}> | undefined>;

interface Props {
  simultaneousHandlers?: SimultaneousHandlerType | SimultaneousHandlerType[];
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

  const activeTextColor = colorScheme === 'dark' ? '#FFFFFF' : '#27272a';
  const doneTextColor = colorScheme === 'dark' ? '#525252' : '#a3a3a3';

  const handleChangeSubject = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeSubject && onChangeSubject(e.nativeEvent.text);
    },
    [onChangeSubject],
  );

  return (
    <SwipableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <View className="w-full h-full bg-red-500 items-end justify-center pr-4">
          {/* <Icon color="white" as={<Feather name="trash-2" />} size="sm" /> */}
          <Icon name="trash-2" size={25} color="#fff" />
        </View>
      }>
      <View className="w-full px-4 py-2 flex flex-row items-center bg-[#fafaf9] dark:bg-[#164e63]">
        <View className="w-[30px] h-[30px] w-8_ h-10_ me-2">
          <Pressable onPress={onToggleCheckbox}>
            <AnimatedCheckbox
              checked={isDone}
              checkmarkColor={checkmarkColor}
              highlightColor={highlightColor}
              boxOutlineColor={boxStroke}
            />
          </Pressable>
        </View>

        {isEditing ? (
          <TextInput
            className="flex-1 text-[19px] px-1 py-0 text-black dark:text-white"
            value={subject}
            placeholder="Task"
            autoFocus
            onChange={handleChangeSubject}
            onBlur={onFinishEditing}
          />
        ) : (
          <AnimatedTaskLabel
            textColor={activeTextColor}
            inactiveTextColor={doneTextColor}
            strikethrough={isDone}
            onPress={onPressLabel}>
            {subject}
          </AnimatedTaskLabel>
        )}
      </View>
    </SwipableView>
  );
}
