import PhotoSetCarousel from "@/components/album/PhotoSetCarousel";
import { TopBar } from "@/components/common/TopBar";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { PolaroidPhoto } from "../album/_type";

interface Props {
  photos: PolaroidPhoto[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onEdit: () => void;
  onDownload: () => void;
  albumTitle: string;
}

/**
 * 앨범 상세 보기 템플릿
 * @param photos - 특정 앨범에 포함된 사진들
 * @param activeIndex - 캐러셀에서 현재 활성화된 사진 인덱스
 * @param setActiveIndex - 활성화된 사진 인덱스를 설정하는 함수
 * @param onEdit - 편집 버튼 클릭 시 호출되는 함수
 * @param onDownload - 다운로드 버튼 클릭 시 호출되는 함수
 * @param albumTitle - 앨범 제목
 */
export default function AlbumIdTemplate({
  photos,
  activeIndex,
  setActiveIndex,
  onEdit,
  onDownload,
  albumTitle,
}: Props) {
  return (
    <View style={styles.page}>
      <TopBar title={albumTitle} />
      <View style={styles.container}>
        <View style={styles.icon_container}>
          <TouchableOpacity onPress={onEdit} style={styles.icon_button}>
            <Image source={require("@/assets/images/icon/icon-edit.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDownload} style={styles.icon_button}>
            <Image source={require("@/assets/images/icon/icon-download.png")} />
          </TouchableOpacity>
        </View>
        <PhotoSetCarousel
          photos={photos}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
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
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  icon_container: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 11,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
  },
  icon_button: {
    width: 24,
    height: 24,
  },
});
