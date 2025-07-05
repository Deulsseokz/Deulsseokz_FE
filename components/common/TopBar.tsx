import { StyleSheet, Text, View } from "react-native";

interface TopBarProps {
  title: string;
}

export function TopBar({ title }: TopBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
});
