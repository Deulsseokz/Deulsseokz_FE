import React from "react";
import { StyleSheet, View } from "react-native";
import PhotoItem, { PhotoType } from "./PhotoItem";

interface PhotoSelectorProps {
  /** 선택 가능한 사진 리스트 */
  photos: any[];
  /** 현재 선택된 사진 리스트 */
  selectedPhotos: any[];
  /** 사진을 선택했을 때 호출되는 콜백 */
  onSelectPhoto: (photo: any) => void;
  /** 최대 선택 가능한 사진 개수 */
  maxSelectCnt: number;
}

/**
 * 사진 선택 컴포넌트
 * - PhotoItem 컴포넌트를 그리드 형태로 표시하고, 선택된 사진은 강조 표시됨
 * - 최대 선택 가능한 사진 개수 제한
 */
export default function PhotoSelector({
  photos,
  selectedPhotos,
  onSelectPhoto,
  maxSelectCnt,
}: PhotoSelectorProps) {
  return (
    <View style={styles.grid}>
      {photos.map((photo, index) => {
        let type: PhotoType = "normal";
        const isSelected = selectedPhotos.includes(photo);

        if (isSelected) {
          type = "selected";
        } else if (selectedPhotos.length >= maxSelectCnt) {
          type = "dimmed";
        }

        return (
          <PhotoItem
            key={index}
            image={photo}
            type={type}
            onPress={() => onSelectPhoto(photo)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 16,
  },
});
