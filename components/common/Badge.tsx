import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { BadgeType } from "@/types/shareType";
import React, { memo, useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { badgeIconsMypage } from "../mypage/_util";

/**
 * 마이페이지에서 관리되는 뱃지 컴포넌트
 */
export interface BadgeProps {
  /** 뱃지 타입 */
  type: BadgeType;
  /** 보유/활성 여부: 이미지(컬러/흑백) 결정 */
  active: boolean;
  /** 선택 가능 화면이면 true/false, 선택 불가 화면이면 undefined */
  selected?: boolean;
  /** 레이블 텍스트 (opt) */
  label?: string;
  /** 클릭 핸들러 (opt) */
  onPress?: () => void;
  /** 대표 배지 여부 (editable 오버레이 표시) */
  isRepresent?: boolean;
}

function BadgeComp({
  type,
  active,
  selected,
  label,
  onPress,
  isRepresent,
}: BadgeProps) {
  const activeSrc = badgeIconsMypage[type].active;
  const inactiveSrc = badgeIconsMypage[type].inactive;

  // 대표 배지일 때만 오버레이 아이콘 로드
  const editableSrc = isRepresent ? require("@/assets/images/editable.png") : undefined;

  // 텍스트 컬러: selected/active 조합 반영
  const textColor = useMemo(() => {
    // 선택 불가 화면
    if (selected === undefined) {
      return active ? MCOLORS.grayscale.gray70 : MCOLORS.grayscale.gray30;
    }
    // 선택 가능 화면
    if (selected) return MCOLORS.brand.secondary; // 선택됨
    return active ? MCOLORS.grayscale.gray70 : MCOLORS.grayscale.gray30; // 선택 안됨
  }, [selected, active]);

  return (
    <Pressable style={styles.container} disabled={!onPress} onPress={onPress}>
      <View style={styles.imageWrap}>
        {/* 이미지 두 장을 겹쳐두고 opacity만 토글하여 즉시 전환 */}
        <Image
          source={inactiveSrc}
          style={[styles.image, { opacity: active ? 0 : 1 }]}
          resizeMode="contain"
        />
        <Image
          source={activeSrc}
          style={[styles.image, { opacity: active ? 1 : 0 }]}
          resizeMode="contain"
        />
        {editableSrc && (
          <Image source={editableSrc} style={styles.editable} resizeMode="contain" />
        )}
      </View>
      {label && <Text style={[styles.text, { color: textColor }]}>{label}</Text>}
    </Pressable>
  );
}

/** 불필요 리렌더 최소화 */
export default memo(BadgeComp, (p, n) =>
  p.type === n.type &&
  p.active === n.active &&
  p.selected === n.selected &&
  p.label === n.label &&
  p.isRepresent === n.isRepresent &&
  p.onPress === n.onPress
);

const SIZE = 55;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
    width: "auto",
  },
  imageWrap: {
    position: "relative",
    height: SIZE,
    width: SIZE,
  },
  image: {
    position: "absolute",
    height: SIZE,
    width: SIZE,
    left: 0,
    top: 0,
  },
  editable: {
    position: "absolute",
    height: SIZE,
    width: SIZE,
    right: 0,
  },
  text: {
    ...fontStyles.medium13,
  },
});
