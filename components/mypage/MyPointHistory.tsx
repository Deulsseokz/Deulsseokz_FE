import { FlatList, StyleSheet, View } from "react-native";

export default function MyPointHistory (){
    return (
        <View style={styles.container}>
            <View>
                {/* 돋보기 버튼 */}
            </View>
            <View>
                {/* 달 변경 버튼 */}
            </View>
            <FlatList
>
                {/* 내역을 받아와 렌더링 */}
            </FlatList>
        </View>
    );
}

const styles= StyleSheet.create({
    container: {
        backgroundColor: '#fbfbfb',
        borderRadius: 20,
    }
});