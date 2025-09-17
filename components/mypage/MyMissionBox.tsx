import ArrowRight from "@/assets/icons/icon-arrow-right.svg";
import { useProfileStore } from "@/store/useProfileStore";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface MyMissionBoxProps {
  isMainComponent: boolean;
  successCount: number;
  totalCount: number;
  onPress?: () => void;
}

export default function MyMissionBox({
  isMainComponent,
  successCount,
  totalCount,
  onPress,
}: MyMissionBoxProps) {
  const profile = useProfileStore((s) => s.data);

  const Content = (
    <View style={styles.box}>
      {isMainComponent && (
        <View style={styles.rowBox}>
          <Text style={styles.title}>나의 미션</Text>
          <ArrowRight />
        </View>
      )}
      <View>
        <View style={styles.rowBox}>
          <Text style={styles.text}>성공 개수</Text>
          <View style={styles.textWrapper}>
            <Text style={styles.pointColor}>{profile.success}</Text>
            <Text style={styles.general}>/ 211</Text>
          </View>
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.text}>정복률</Text>
          <View style={styles.textWrapper}>
            <Text style={styles.pointColor}>{profile.conquer}</Text>
            <Text style={styles.general}>%</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return isMainComponent ? (
    <Pressable onPress={onPress}>{Content}</Pressable>
  ) : (
    Content
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#FFF3F6",
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FFEAEF",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
    marginBottom: 20,
  },
  rowBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  title: { fontWeight: "700", fontSize: 15 },
  text: { fontSize: 13, fontWeight: "500" },
  pointColor: { color: "tomato", fontWeight: "700", fontSize: 17 },
  general: { fontSize: 15 },
});
