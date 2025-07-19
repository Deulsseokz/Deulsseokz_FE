import { AlbumItem } from "@/api/type";
import PhotoSet from "@/components/album/Photoset";
import { useRouter } from "expo-router";
import { ImageSourcePropType, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";

interface Props {
  title: string;
  albums: AlbumItem[];
}

/**
 * 앨범 홈 템플릿 컴포넌트
 * @param title - 앨범 홈 제목
 * @param albums - 앨범 리스트
 */
export default function AlbumHomeTemplate({ title, albums }: Props) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;

  const normalizeImages = (photo: string | string[] | null): ImageSourcePropType[] => {
    if (!photo) return [];
    if (Array.isArray(photo)) {
      return photo.map((url) => ({ uri: url }));
    }
    return [{ uri: photo }];
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {albums.map((album, index) => (
          <View key={`${album.place}-${index}`} style={[styles.item, isSmallScreen && styles.fullItem]}>
            <PhotoSet
              images={normalizeImages(album.representPhoto)}
              label={album.place}
              onPress={() => router.push(`/album/${album.place}`)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    gap: 50,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "space-between",
  },
  item: {
    width: "45%",
  },
  fullItem: {
    width: "45%",
  },
});
