import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface PriceTagProps {
  /** 가격 */
  price: number;
}

/**
 * 가격 표시 컴포넌트
 */
export default function PriceTag({ price }: PriceTagProps) {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require("@/assets/images/album/icon-coins.png")}
        style={styles.coin}
      />
      <Text style={styles.price}>{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#F8F8F8",
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  coin: {
    width: 20,
    height: 20,
  },
  price: {
    fontSize: 13,
    color: "#4A4A4A",
    fontWeight: "500",
  },
});
