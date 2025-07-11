import { StyleSheet, Text, View } from "react-native";

interface BoxProps {
  label: string;
  description: string;
}

export function Box({ label, description }: BoxProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      {description && <Text style={styles.desc}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  desc: {
    marginTop: 4,
    color: "#555",
  },
});
