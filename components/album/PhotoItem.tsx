import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

/** 사진 아이템 타입 정의 
 * - "normal": 일반 사진
 * - "dimmed": 블러 표시된 사진
 * - "selected": 선택된 사진
*/
export type PhotoType = "normal" | "dimmed" | "selected"; 


interface PhotoItemProps {
  /** 표시할 사진 이미지 */
  image: any; //TODO: image 타입을 OS에 맞게 변경할 예정
  /** 사진 아이템의 타입 */
  type: PhotoType;
  /** 사진 아이템을 클릭했을 때 호출되는 함수 */
  onPress: () => void;
}

/**
 * 앨범에서 사진 아이템을 표시하는 컴포넌트
 * - type에 따라 스타일이 변경됨
 */
export default function PhotoItem({ image, type, onPress }: PhotoItemProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Image
        source={image}
        style={[
          styles.image,
          type === "dimmed" && styles.dimmed,
          type === "selected" && styles.selected,
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 133,
    borderRadius: 8,
    margin: 6,
  },
  dimmed: {
    opacity: 0.3,
  },
  selected: {
    borderWidth: 3,
    borderColor: "#FF6B9A",
  },
});
