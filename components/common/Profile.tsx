import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Profile () {
    return (<Pressable onPress={()=>router.push('/mypage/profile')}><Text style={styles.text}>프로필 예시입니다</Text></Pressable>)
}

const styles= StyleSheet.create({
    text: {
        color: '#ffffff',
    }
});