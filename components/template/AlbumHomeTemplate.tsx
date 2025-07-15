import { IAlbum } from "@/app/(tabs)/album";
import PhotoSet from "@/components/album/Photoset";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";

interface Props {
  title: string;
  albums: IAlbum[];
}

/**
 * 앨범 홈 템플릿 컴포넌트
 * @param title - 앨범 홈 제목
 * @param albums - 앨범 리스트
 */
export default function AlbumHomeTemplate({ title, albums }: Props) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 380;

  return (
    <View style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {albums.map((album) => (
          <View key={album.id} style={[styles.item, isSmallScreen && styles.fullItem]}>
            <PhotoSet
              images={album.images}
              label={album.label}
              onPress={() => router.push(`/album/${album.id}`)}
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
    justifyContent: "flex-start",
  },
  item: {
    width: "47%",
  },
  fullItem: {
    width: "100%",
  },
});
