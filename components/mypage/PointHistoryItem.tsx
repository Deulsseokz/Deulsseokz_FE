import { MyPointHistoryItem } from "@/api/type";
import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { StyleSheet, Text, View } from "react-native";

type PointHistoryInterface = Pick<MyPointHistoryItem, 'date' | 'content' | 'todayPoint'> & {
  changedPoint: number;
};

export default function PointHistoryItem({date,  content, todayPoint, changedPoint} : PointHistoryInterface) {
  const displayDate = date.slice(5); 

  return (
    <View style={styles.historyRow}>
        <Text style={styles.historyDate}>{displayDate}</Text>
        <Text style={styles.historyDesc}>{content}</Text>
        <View>
            <Text style={[
                styles.historyChange,
                styles.font13,
                changedPoint > 0 ? styles.plus : styles.minus
            ]}>
                {changedPoint > 0 ? `+${changedPoint}` : changedPoint}
            </Text>
            <Text style={{...styles.historyRemain, ...styles.font13}}>{todayPoint}</Text>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    historyRow: {
        minHeight: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginHorizontal: 10,
      },
      historyDate: {
        width: 50,
        color: MCOLORS.grayscale.gray50,
        ...fontStyles.medium13,
      },
      historyDesc: {
        flex: 1,
        color: MCOLORS.grayscale.gray80,
        ...fontStyles.medium13,
      },
      historyChange: {
        width: 60,
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 15,
      },
      font13: {
        ...fontStyles.medium13
      },
      plus: {
        color: MCOLORS.brand.secondary,
      },
      minus: {
        color: MCOLORS.grayscale.gray80,
      },
      historyRemain: {
        textAlign: 'right',
        color: MCOLORS.grayscale.gray30,
      },
})