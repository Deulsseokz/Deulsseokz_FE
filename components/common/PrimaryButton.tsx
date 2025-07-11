import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface PrimaryButtonProps {
  text: string;
  onPress: () => void;
}

export function PrimaryButton({ text, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#eee",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
