import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import MainGradientItem from "../mypage/MainGradientItem";
import MainRenderItem from "../mypage/MainRenderItem";

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
