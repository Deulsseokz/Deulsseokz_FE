import { BlurView } from 'expo-blur';
import React, { useEffect } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type Person = { id: string | number; name: string; avatar: ImageSourcePropType };

type Props = {
  /** 표시할 사람들 리스트 */
  people: Person[];
  /** 펼침 여부 */
  expanded: boolean;
  /** 펼침/접힘 토글 핸들러 */
  onToggle: () => void;
  /** 상단 위치 (기본: 15) */
  top?: number;
  /** 좌측 위치 (기본: 15) */
  left?: number;
};

const NUM_COLS = 3;

export default function PeopleOverlay({ people, expanded, onToggle, top = 15, left = 15 }: Props) {
  // 0(접힘) → 1(펼침)
  const progress = useSharedValue(expanded ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(expanded ? 1 : 0, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [expanded]);

  // 접힘(겹친 아바타) 애니메이션
  const collapsedAnim = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [
      { scale: interpolate(progress.value, [0, 1], [1, 0.92]) },
      { translateY: interpolate(progress.value, [0, 1], [0, -4]) },
    ],
  }));

  // 펼침(블러 그리드) 애니메이션
  const expandedAnim = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { scale: interpolate(progress.value, [0, 1], [0.96, 1]) },
      { translateY: interpolate(progress.value, [0, 1], [-6, 0]) },
    ],
  }));

  if (!people?.length) return null;

  return (
    <>
      {/* 접힘 상태 */}
      <Animated.View
        style={[styles.collapsedWrap, { top, left }, collapsedAnim]}
        pointerEvents={expanded ? 'none' : 'auto'}
      >
        <Pressable onPress={onToggle} hitSlop={8} style={styles.rowCollapsed}>
          {people.map((p, i) => (
            <Image
              key={p.id}
              source={p.avatar}
              style={[styles.avatarSm, i > 0 && styles.overlap]}
            />
          ))}
        </Pressable>
      </Animated.View>

      {/* 펼침 상태 */}
      <Animated.View
        style={[styles.expandedWrap, { top, left }, expandedAnim]}
        pointerEvents={expanded ? 'auto' : 'none'}
      >
        <BlurView intensity={50} tint="default" style={styles.blur}>
          <Pressable onPress={onToggle} style={styles.expandedGrid}>
            {people.map(p => (
              <View key={p.id} style={styles.gridCell}>
                <Image source={p.avatar} style={styles.avatarLg} />
                <Text style={styles.avatarName}>{p.name}</Text>
              </View>
            ))}
          </Pressable>
        </BlurView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  // 접힘
  collapsedWrap: {
    position: 'absolute',
  },
  rowCollapsed: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarSm: {
    width: 34,
    height: 34,
    borderRadius: 100,
    backgroundColor: '#DDD',
    borderWidth: 2,
    borderColor: '#E9E9E9',
  },
  overlap: { marginLeft: -10 },

  // 펼침
  expandedWrap: {
    position: 'absolute',
    maxWidth: 190,
    borderRadius: 18,
    overflow: 'hidden',
  },
  blur: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  expandedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
  },
  gridCell: {
    // width: `${100 / NUM_COLS}%`,
    alignItems: 'center',
    width: 40,
  },
  avatarLg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#DDD',
  },
  avatarName: {
    marginTop: 5,
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
  },
});
