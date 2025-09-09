import MyPageProfileTemplate from "@/components/template/MyPageProfileTemplate";
import { useProfileStore } from "@/store/useProfileStore";
import pickImageFromLibrary from "@/utils/pickImageFromLibrary";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ProfileScreen(){
  const updateProfile = useProfileStore(s => s.updateProfile);
  const error = useProfileStore(s => s.error);

  /** 1) 이름 변경 route 함수 */
  const changeNameRoute= () => {
    router.push('/mypage/profile/change')
  }

  /** 2) 프로필 사진 변경 route 함수 */
  const changeProfileImage= async () => {
    const imageUri = await pickImageFromLibrary();
    await updateProfile({ userName: null , profileImage: imageUri ? imageUri : null});
    if (!imageUri || error) alert("프로필 사진 변경에 실패했습니다. 다시 시도해주세요.");
  }

    return (
    <View style={styles.page}>
       <MyPageProfileTemplate changeNameRoute={changeNameRoute} changeProfileImage={changeProfileImage}/>
    </View>
    )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
  },
});
