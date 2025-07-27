import React, {useEffect, memo} from 'react';
import {Text, View} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  interpolateColor,
} from 'react-native-reanimated';

interface Props {
  strikethrough: boolean;
  textColor: string;
  inactiveTextColor: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

const AnimatedTaskLabel = memo((props: Props) => {
  const {strikethrough, textColor, inactiveTextColor, onPress, children} =
    props;

  const hstackOffset = useSharedValue(0);
  const hstackAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [{translateX: hstackOffset.value}],
    }),
    [strikethrough],
  );
  const textColorProgress = useSharedValue(0);
  const textColorAnimatedStyles = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor],
      ),
    }),
    [strikethrough, textColor, inactiveTextColor],
  );
  const strikethroughWidth = useSharedValue(0);
  const strikethroughAnimatedStyles = useAnimatedStyle(
    () => ({
      width: `${strikethroughWidth.value * 100}%`,
      borderBottomColor: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor],
      ),
    }),
    [strikethrough, textColor, inactiveTextColor],
  );

  useEffect(() => {
    const easing = Easing.out(Easing.quad);
    if (strikethrough) {
      hstackOffset.value = withSequence(
        withTiming(4, {duration: 200, easing}),
        withTiming(0, {duration: 200, easing}),
      );
      strikethroughWidth.value = withTiming(1, {duration: 300, easing});
      textColorProgress.value = withDelay(
        1000,
        withTiming(1, {duration: 300, easing}),
      );
    } else {
      strikethroughWidth.value = withTiming(0, {duration: 300, easing});
      textColorProgress.value = withTiming(0, {duration: 300, easing});
    }
  });

  return (
    <Pressable onPress={onPress}>
      <AnimatedView
        className="flex flex-row items-center relative"
        style={[hstackAnimatedStyles]}>
        <AnimatedText
          numberOfLines={1}
          className="text-[19px] px-1"
          style={[textColorAnimatedStyles]}>
          {children}
        </AnimatedText>
        <AnimatedView
          className="absolute h-[1px] border-b"
          style={[strikethroughAnimatedStyles]}
        />
      </AnimatedView>
    </Pressable>
  );
});

export default AnimatedTaskLabel;
