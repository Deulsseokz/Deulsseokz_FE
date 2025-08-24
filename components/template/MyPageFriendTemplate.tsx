import { StyleSheet, View } from "react-native";
import { TopBar } from "../common/TopBar";

export default function MyPageFriendTemplate(){
    return (<View style={styles.page}>
        <TopBar title="친구 관리"/>
    </View>)
}

const styles= StyleSheet.create({
      page: {
        flex:1,
        backgroundColor: '#FFF',
    },
})