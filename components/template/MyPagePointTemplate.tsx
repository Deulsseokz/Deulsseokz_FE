import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { StyleSheet, Text, View } from "react-native";
import { TopBar } from "../common/TopBar";
import MyPointBox from "../mypage/MyPointBox";

interface MyPagePoint{
    /** 유저가 가진 포인트 */
    point : number;
}

export default function MyPagePointTemplate(){
    return (
    <View style={styles.page}>
        <TopBar title="포인트"/>
        <View style={styles.container}>
            <MyPointBox/>
            <View style={styles.pointHistory}>
                <Text style={styles.pointHistoryText}>포인트 내역</Text>
            </View>
        </View>
    </View>)
}

const styles= StyleSheet.create({
    page: {
        flex:1,
        backgroundColor: '#FFF',
        gap: 40,
    },
    container: {
        gap: 50,
        paddingHorizontal: 20,
    },
    content: {
        height: 'auto',
        width: '100%',
    },
    pointHistory: {
        gap: 20,
    },
    pointHistoryText: {
        color: MCOLORS.grayscale.gray70,
        ...fontStyles.bold15,
    }
})