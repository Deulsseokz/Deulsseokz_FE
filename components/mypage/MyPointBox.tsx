import Icon from "@/assets/icons/icon-shop.svg";
import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MyPointBox (){
    const onPress = () => {
        router.push('/mypage/point/shop');
    }

    return (
        <View style={styles.box}>
            <Text style={styles.text}>나의 포인트</Text>
            <View style={styles.rowBox}>
                <Text style={styles.point}>300</Text>
                <Pressable onPress={onPress} style={styles.shopBtn}>
                      <Icon width={20} height={20}/>
                </Pressable>
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
        padding: 20,
        paddingRight: 10,
    },
    rowBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        color: MCOLORS.grayscale.gray50,
        ...fontStyles.medium15
    },
    point: {
        color: MCOLORS.grayscale.gray80,
         ...fontStyles.medium15
    },
    shopBtn: {
        paddingHorizontal:10,
    }
});