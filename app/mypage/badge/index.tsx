import MyPageBadgeTemplate from "@/components/template/MyPageBadgeTemplate";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

// 배지 메인 스크린
export default function BadgeScreen(){
  const onEditRepresent =() => router.push('/mypage/badge/change');
  
  const onModalOpen = (badgeId: string) => {
    console.log(badgeId);
}

    return (
    <View style={styles.container}>
      <MyPageBadgeTemplate onEditRepresent={onEditRepresent} onModalOpen={onModalOpen}/>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
