import MyPageFavoriteTemplate from "@/components/template/MyPageFavoriteTemplate";
import { StyleSheet, View } from "react-native";

export default function FavoriteScreen(){
    return (
    <View style={styles.container}>
       <MyPageFavoriteTemplate/>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
