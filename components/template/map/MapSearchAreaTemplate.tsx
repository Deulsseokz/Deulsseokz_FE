import SearchBar from "@/components/common/SearchBar";
import { useRouter } from "expo-router";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MapSearchAreaTemplate {
  // 검색 버튼을 눌렀을 때 검색어를 전달하는 버튼
  onSearchBtn: (input: string) => void;
}

// 지역에 대한 검색을 하고, 그 결과로 지역과 랜드마크 리스트 아이템을 리턴하는 스크린
export default function MapSearchAreaTemplate({ onSearchBtn }: MapSearchAreaTemplate) {
  const router = useRouter();
 
  return (
    <SafeAreaView style={style.container}>
       <SearchBar
        onBack={() => router.back()}
        onSearch={onSearchBtn}
        placeholder="지역이나 장소를 입력하세요"
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
