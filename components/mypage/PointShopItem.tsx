import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { formatKRW } from "@/utils/priceUtil";
import { StyleSheet, Text, View } from "react-native";

interface PointShopProps {
    point: number;
    price: number;
}

export default function PointShopItem ({point, price} : PointShopProps) {
    return (
    <View style={styles.box}>
        <Text style={[styles.font, styles.black]}>{point}</Text>
        <View style={styles.rowContainer}>
            <Text style={[styles.font, styles.primary]}>{formatKRW(price)}</Text>
            <Text style={[styles.font, styles.gray]}>원</Text>
        </View>
    </View>);
}

const styles= StyleSheet.create({
    box: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowContainer : {
        flexDirection: 'row'
    },
    font: {
        ...fontStyles.medium15,
    },
    black: {
        color: MCOLORS.grayscale.gray70,
    },
    primary: {
        color: MCOLORS.brand.secondary,
    },
    gray: {
        color: MCOLORS.grayscale.gray30,
    }
})
