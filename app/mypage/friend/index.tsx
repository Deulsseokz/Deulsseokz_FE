import { StyleSheet, Text, View } from "react-native";

export default function FriendScreen(){
    return (
    <View style={styles.container}>
        <Text>Friend 스크린입니다</Text>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
