import { StyleSheet, Text, View } from "react-native";

export default function BadgeScreen(){
    return (
    <View style={styles.container}>
        <Text>Badge 스크린입니다</Text>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
