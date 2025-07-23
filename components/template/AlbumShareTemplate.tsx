import PhotoSelector from "@/components/album/PhotoSelector";
import { PrimaryButton } from "@/components/common/Button/PrimaryButton";
import PriceTag from "@/components/common/PriceTag";
import { TopBar } from "@/components/common/TopBar";
import { ButtonVariant } from "@/constants/buttonTypes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PolaroidPhoto } from "../album/_type";

interface AlbumShareTemplateProps {
  maxSelectCount: number;
  selectedPhotos: PolaroidPhoto[];
  photos: PolaroidPhoto[];
  onSelectPhoto: (photo: PolaroidPhoto) => void;
  onPressNext: () => void;
}

/**
 * 앨범 공유 템플릿 - 사진 선택
 * - 선택된 사진을 강조 표시하고, 최대 선택 개수 제한
 * @param maxSelectCount - 최대 선택 가능한 사진 개수
 * @param photos - 전체 사진 리스트
 * @param selectedPhotos - 현재 선택된 사진 리스트
 * @param onSelectPhoto - 사진 선택/해제 핸들러
 * @param onPressNext - 다음 단계로 넘어가는 핸들러
 */
export default function AlbumShareTemplate({
  maxSelectCount,
  selectedPhotos,
  photos,
  onSelectPhoto,
  onPressNext,
}: AlbumShareTemplateProps) {
  return (
    <View style={styles.page}>
      <TopBar title="" rightButton={<PriceTag price={800} />} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            공유할 사진을 선택하세요{" "}
            <Text style={styles.count}>{selectedPhotos.length}</Text>
          </Text>
          <Text style={styles.limit}>최대 {maxSelectCount}장 가능</Text>
        </View>
        <View style={styles.wrapper}>
          <PhotoSelector
            photos={photos.map((p) => p.image)}
            selectedPhotos={selectedPhotos.map((p) => p.image)}
            onSelectPhoto={(selectedImage) => {
              const matched = photos.find(
                (p) =>
                  typeof p.image === "object" &&
                  p.image !== null &&
                  "uri" in p.image &&
                  "uri" in selectedImage &&
                  p.image.uri === selectedImage.uri
              );
              if (matched) {
                onSelectPhoto(matched);
              }
            }}
            maxSelectCnt={maxSelectCount}
          />
        </View>
        <PrimaryButton text="다음" variant={ButtonVariant.Primary} onPress={onPressNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    width: "100%",
    gap: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: "#313131",
    lineHeight: 20,
  },
  count: {
    color: "#FF6B9A",
    fontSize: 15,
    fontWeight: "500",
    paddingLeft: 8,
    lineHeight: 20,
  },
  limit: {
    color: "#ACACAC",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
  },
  wrapper: {
    flex: 1,
    width: "100%",
  },
});
