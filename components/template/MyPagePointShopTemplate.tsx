import { StyleSheet, View } from "react-native";
import PriceTag from "../common/PriceTag";
import { TopBar } from "../common/TopBar";
import PointShop from "../mypage/PointShop";

export default function MyPagePointShopTemplate(){
    return (
        <View style={styles.page}>
            <TopBar title="포인트 충전"/>
            <View style={styles.content}>
            <View style={styles.pointTag}>
                <PriceTag price={400}/>
            </View>
            <PointShop/>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        gap: 39,
    },
    pointTag: {
        width: 69,
        alignSelf: 'flex-end',
    }
})