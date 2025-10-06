import { StyleSheet } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function AnimatedImage({
  data,
  index,
  activeIndex,
}: {
  data: any;
  index: number;
  activeIndex: SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = activeIndex.value === index;
    return {
      opacity: withTiming(isActive ? 1 : 0, { duration: 500 }),
    };
  });

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <Animated.Image source={data.image} style={{ width: data.width, height: data.height }} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
