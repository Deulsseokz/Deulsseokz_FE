import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { StyleSheet, Text, View } from "react-native";

// TODO: 성공 개수, 정복률 받아오기

export default function MyMissionBox (){

    return (
        <View style={styles.box}>
            <View style={styles.rowBox}>
                <Text style={styles.title}>나의 미션</Text>
                </View>
            <View>
                <View style={styles.rowBox}>
                    <Text style={styles.text}>성공 개수</Text>
                    <View style={styles.textWrapper}>
                        <Text style={styles.pointColor}>4</Text>
                        <Text style={styles.general}>/ 30</Text>
                    </View>
                </View>
                <View style={styles.rowBox}>
                    <Text style={styles.text}>정복률</Text>
                    <View style={styles.textWrapper}>
                        <Text style={styles.pointColor}>15</Text>
                        <Text style={styles.general}>%</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles= StyleSheet.create({
    box: {
        
        backgroundColor: '#FFF3F6',
        borderRadius: 20,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FFEAEF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 10,
        alignItems: 'center',
        padding : 10,
        paddingTop: 20,
        marginBottom: 20,
    },
    rowBox: {
        width:'100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    textWrapper : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        gap: 3,
    },
    title : {
        color : MCOLORS.grayscale.gray70,
        ...fontStyles.bold15
    },
    text: {
        color: MCOLORS.grayscale.gray50,
        fontSize: 13,
        fontWeight: '500',
    },
    pointColor: {
        color: MCOLORS.brand.secondary,
         ...fontStyles.bold17,
    },
    general : {
        color: MCOLORS.grayscale.gray50,
         ...fontStyles.medium15
    },
    icn: {
        paddingHorizontal:20,
    }
});