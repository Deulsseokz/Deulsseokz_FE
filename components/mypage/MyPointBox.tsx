import CoinIcn from "@/assets/icons/icon-coins.svg";
import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { StyleSheet, Text, View } from "react-native";

interface PointBoxInterface {
    holdingPoint: number;
}

export default function MyPointBox ({holdingPoint}: PointBoxInterface){

    return (
        <View style={styles.box}>
            <Text style={styles.text}>나의 포인트</Text>
            <View style={styles.rowBox}>
                <CoinIcn width={28} height={28} style={styles.icn}/>
                <Text style={styles.point}>{holdingPoint}</Text>
            </View>
        </View>
    );
}

const styles= StyleSheet.create({
    box: {
        backgroundColor: '#FBFBFB',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingRight: 30,
    },
    rowBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center'
    },
    text: {
        color: MCOLORS.grayscale.gray70,
        fontSize: 14,
        fontWeight: '500',
    },
    point: {
        color: MCOLORS.grayscale.gray80,
         ...fontStyles.medium15
    },
    icn: {
        paddingHorizontal:20,
    }
});