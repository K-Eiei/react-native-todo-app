import React, {ComponentType, RefObject} from 'react';
import {Dimensions, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureType,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2;

type SimultaneousHandlerType =
  | GestureType
  | RefObject<GestureType | undefined>
  | RefObject<ComponentType<{}> | undefined>;

interface Props {
  simultaneousHandlers?: SimultaneousHandlerType | SimultaneousHandlerType[];
  children: React.ReactNode;
  backView?: React.ReactNode;
  onSwipeLeft?: () => void;
}

const StyledView = Animated.View;

export default function SwipeView({
  children,
  backView,
  simultaneousHandlers,
  onSwipeLeft,
}: Props) {
  const translateX = useSharedValue(0);

  const createPanGesture = () => {
    let gesture = Gesture.Pan()
      .activeOffsetX([-10, 10])
      .onUpdate(e => {
        translateX.value = Math.max(-128, Math.min(0, e.translationX));
      })
      .onEnd(() => {
        const shouldDismiss = translateX.value < SWIPE_THRESHOLD;
        if (shouldDismiss) {
          translateX.value = withTiming(-SCREEN_WIDTH);
          if (onSwipeLeft) {
            runOnJS(onSwipeLeft)();
          }
        } else {
          translateX.value = withTiming(0);
        }
      });

    if (simultaneousHandlers) {
      const handlers = Array.isArray(simultaneousHandlers)
        ? simultaneousHandlers
        : [simultaneousHandlers];
      handlers.forEach(handler => {
        gesture = gesture.simultaneousWithExternalGesture(handler);
      });
    }

    return gesture;
  };

  const panGesture = createPanGesture();

  //   const panGesture = Gesture.Pan()
  //     .activeOffsetX([-10, 10])
  //     // .simultaneousWithExternalGesture(simultaneousHandlers)
  //     .onUpdate(e => {
  //       translateX.value = Math.max(-128, Math.min(0, e.translationX));
  //     })
  //     .onEnd(() => {
  //       const shouldDismiss = translateX.value < SWIPE_THRESHOLD;
  //       if (shouldDismiss) {
  //         translateX.value = withTiming(-SCREEN_WIDTH);
  //         if (onSwipeLeft) {
  //           runOnJS(onSwipeLeft)();
  //         }
  //       } else {
  //         translateX.value = withTiming(0);
  //       }
  //     });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <StyledView className="w-full">
      {backView && (
        <View className="absolute left-0 right-0 top-0 bottom-0 z-0">
          {backView}
        </View>
      )}
      <GestureDetector gesture={panGesture}>
        <Animated.View className="z-10" style={animatedStyle}>
          {children}
        </Animated.View>
      </GestureDetector>
    </StyledView>
  );
}
