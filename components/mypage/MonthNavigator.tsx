import ArrowLeft from "@/assets/icons/icon-arrow-left.svg";
import ArrowRight from "@/assets/icons/icon-arrow-right.svg";
import { MCOLORS } from "@/constants/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MonthNavigatorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

// 문자열을 Date 객체로 변환
function ymToDate(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1);
}

// Date 객체를 문자열로 변환
function toYM(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

// 날짜 포맷팅
function formatLabel(ym: string) {
  const d = ymToDate(ym);
  return `${d.getFullYear()}. ${d.getMonth() + 1}.`;
}

// 오늘 날짜의 연월을 반환
function getTodayYM() {
  return toYM(new Date());
}

export function MonthNavigator({
  selectedMonth,
  onMonthChange,
}: MonthNavigatorProps) {
  const todayYM = getTodayYM();

  // 이전/다음 달 계산
  const d = ymToDate(selectedMonth);
  const prevYM = toYM(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextYM = toYM(new Date(d.getFullYear(), d.getMonth() + 1, 1));

  // 미래 날짜면 아예 버튼이 안 보이도록
  const isNextDisabled = nextYM > todayYM;

  return (
    <View style={styles.monthBar}>
      <TouchableOpacity onPress={() => onMonthChange(prevYM)}>
        <ArrowLeft style={styles.arrow} />
      </TouchableOpacity>

      <Text style={styles.monthText}>{formatLabel(selectedMonth)}</Text>

      {!isNextDisabled && (
        <TouchableOpacity onPress={() => onMonthChange(nextYM)}>
          <ArrowRight style={styles.arrow} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  monthBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  arrow: {
    fontSize: 22,
    paddingHorizontal: 10,
    color: MCOLORS.grayscale.gray70,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});
