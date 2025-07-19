import { formatDate } from "@/utils/formatDate";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { PolaroidProps } from "./_type";

/**
 * 기본 폴라로이드 컴포넌트
 */
export default function Polaroid({ photo }: PolaroidProps) {
  const { image, additional, date } = photo;

  return (
    <View style={styles.polaroid}>
      <Image source={image} style={styles.image} />

      <View>
        <Text style={styles.emoji}>
          {additional.feeling} {additional.weather}
        </Text>

        <Text style={styles.desc} numberOfLines={2}>
          {additional.desc}
        </Text>
      </View>

      <Text style={styles.date}>{formatDate(date)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  polaroid: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "column",
    gap: 10,
    width: 195,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 1.35 },
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 225,
    resizeMode: "cover",
  },
  emoji: {
    fontSize: 15,
    marginBottom: 3.75,
  },
  desc: {
    fontSize: 9.75,
    lineHeight: 15,
    color: "#4A4A4A",
  },
  date: {
    fontSize: 8,
    color: "#ACACAC",
    paddingVertical: 15,
  },
});
