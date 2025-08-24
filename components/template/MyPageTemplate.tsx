import { MyPageItem } from "@/api/type";
import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import MainGradientItem from "../mypage/MainGradientItem";
import MainRenderItem from "../mypage/MainRenderItem";

interface MyPageTemplateInterface {
  myPageInfo: MyPageItem; // 마이페이지에서 사용되는 정보 (이름, 프로필 사진, 뱃지 아이디)
}

export default function MyPageTemplate() {
  return (
    <SafeAreaView style={styles.container}>
       <Text style={styles.title}>마이페이지</Text>
       <MainGradientItem/>
       <MainRenderItem/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  title: {
    color: MCOLORS.grayscale.gray80,
    ...fontStyles.bold20,
    marginBottom: 50,
  },
});
