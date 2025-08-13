import MyPageProfileTemplate from "@/components/template/MyPageProfileTemplate";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ProfileScreen(){
  /** route 함수 */
  const changeNameRoute= () => {
    router.push('/mypage/profile/change')
  }

    return (
    <View style={styles.page}>
       <MyPageProfileTemplate changeNameRoute={changeNameRoute}/>
    </View>
    )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
  },
});
