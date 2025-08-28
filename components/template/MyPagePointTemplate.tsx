import { MyPointHistoryItem } from "@/api/type";
import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TopBar } from "../common/TopBar";
import { MonthNavigator } from "../mypage/MonthNavigator";
import MyPointBox from "../mypage/MyPointBox";
import PointHistoryItem from "../mypage/PointHistoryItem";

function toYM(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export interface PointScreenProps {
  holdingPoint: number;
  pointLogs: MyPointHistoryItem[];
}

export default function MyPagePointTemplate({ holdingPoint, pointLogs }: PointScreenProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>(toYM(new Date()));

  const monthHistory = useMemo(() => {
    const prefix = `${selectedMonth}-`;
    return pointLogs
      .filter((h) => h.date.startsWith(prefix)) // 선택된 달의 히스토리만 필터링
      .sort((a, b) => (a.date < b.date ? 1 : -1)); // 날짜 최신순 정렬
  }, [selectedMonth]);

  return (
    <View style={styles.page}>
      <TopBar title="포인트" />
      <View style={styles.container}>
        <MyPointBox holdingPoint={holdingPoint} />

        <View style={styles.pointHistory}>
          <Text style={styles.pointHistoryText}>포인트 내역</Text>

          <MonthNavigator
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />

          <FlatList
            style={styles.historyList}
            data={monthHistory}
            keyExtractor={(item) => `${item.date}-${item.todayPoint}`}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <PointHistoryItem
                date={item.date}
                content={item.content}
                todayPoint={item.todayPoint}
                changedPoint={item.pointEarned==0 ? item.pointUsed : item.pointEarned}
              />
            )}
            ListEmptyComponent={
              <Text style={{ color: MCOLORS.grayscale.gray50 }}>
                해당 달의 내역이 없어요.
              </Text>
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFF",
    gap: 40,
  },
  container: {
    gap: 50,
    paddingHorizontal: 20,
  },
  pointHistory: {
    gap: 20,
  },
  pointHistoryText: {
    color: MCOLORS.grayscale.gray70,
    ...fontStyles.bold15,
  },
  historyList: {
    backgroundColor: "#FAFAFA",
    borderRadius: 18,
    padding: 18,
    gap: 12,
  },
  separator: {
    height: 15,
  },
});