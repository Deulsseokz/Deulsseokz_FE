import { MCOLORS } from "@/constants/colors";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import TextField from "../common/TextField";
import { TopBar } from "../common/TopBar";

interface ProfileChangeProps {
    /** 입력값 */
    text: string;
    /** 텍스트 변경시 호출 함수 */
    setText: (name:string)=>void;
    /** 텍스트 저장시 호출 함수 */
    onChangeNameConfirm: ()=>void;
}

export default function MyPageProfileChangeTemplate({
    text,
    setText,
    onChangeNameConfirm
}:ProfileChangeProps){
    const btnTextColor = text!='' ? MCOLORS.brand.secondary : MCOLORS.grayscale.gray10;

    return <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TopBar title="이름 변경" rightButton={<Text style={{color: btnTextColor}}>저장</Text>} onRightPress={onChangeNameConfirm}/>
        <View style={styles.container}>
        <TextField
            placeholder="이름을 입력하세요"
            value={text}
            onChangeText={setText}
            maxLength={20}
        />
        </View>
    </KeyboardAvoidingView>
}

const styles= StyleSheet.create({
     page: {
        flex:1,
        backgroundColor: '#FFF',
    },
    container : {
        marginTop: 50,
        paddingHorizontal: 20,
    }
})