import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Profile from "../common/Profile";
import { TopBar } from "../common/TopBar";

interface ProfileTemplateProps{
    // 이름 변경을 위한 스크린 push 함수
    changeNameRoute: ()=>void;
}

export default function MyPageProfileTemplate({changeNameRoute}: ProfileTemplateProps){
    return (<View style={styles.page}>
        <TopBar title="프로필"/>
        <View style={styles.container}>
            <Profile/>
            <View style={styles.textContainer}>
                <Pressable onPress={changeNameRoute}>
                     <Text style={styles.textBtnText}>이름 변경</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.textBtnText}>프로필 사진 변경</Text>
                </Pressable>
            </View>
        </View>
    </View>)
}

const styles= StyleSheet.create({
    page: {
        flex:1,
        backgroundColor: '#FFF',
    },
    container : {
        display:'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 30,
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    textContainer:{
        width: '100%',
        display:'flex',
        alignItems:'flex-start',
    },
    textBtnText: {
        padding: 10,
        color: MCOLORS.grayscale.gray70,
        ...fontStyles.medium15,
    }
})