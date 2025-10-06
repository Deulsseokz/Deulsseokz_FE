import { MCOLORS } from '@/constants/colors';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function Dot({ index, activeIndex }: { index: number; activeIndex: SharedValue<number> }) {
  // useAnimatedStyle은 이제 activeIndex의 변화에 따라 동적으로 스타일을 계산
  const animatedDotStyle = useAnimatedStyle(() => {
    // 현재 점이 활성화 상태인지 확인
    const isActive = activeIndex.value === index;

    return {
      width: withTiming(isActive ? 20 : 7, { duration: 500 }),
      height: 7,
      borderRadius: withTiming(isActive ? 50 : 3, { duration: 500 }),
      backgroundColor: withTiming(isActive ? MCOLORS.brand.secondary : MCOLORS.grayscale.gray10, {
        duration: 500,
      }),
    };
  });

  return <Animated.View style={animatedDotStyle} />;
}
