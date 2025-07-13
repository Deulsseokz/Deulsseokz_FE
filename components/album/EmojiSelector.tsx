import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

/**
 * 이모지 선택 컴포넌트에 전달되는 props 타입
 * @template T 이모지(문자열)의 타입
 */
export interface EmojiSelectorProps<T extends string> {
  /** 선택자 앞에 붙는 라벨 텍스트 */
  label: string;
  /** 선택 가능한 이모지 목록 */
  options: T[];
  /** 현재 선택된 이모지 */
  selected: T;
  /** 이모지를 선택했을 때 호출되는 콜백 */
  onSelect: (val: T) => void;
}

/**
 * 이모지 선택 컴포넌트
 * - 선택된 항목은 강조되며
 * - 클릭 시 onSelect 콜백이 호출됨
 */
export default function EmojiSelector<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: EmojiSelectorProps<T>) {
  return (
    <View style={styles.selector}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.emojiRow}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => onSelect(opt)}
            style={[
              styles.emojiWrapper,
              selected === opt ? styles.selected : styles.unselected,
            ]}
          >
            <Text style={styles.emoji}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selector: {
    width: "100%",
    flexDirection: "row",
    gap: 25,
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderRadius: 15,
    paddingRight: 11,
    paddingVertical: 11,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#4A4A4A",
  },
  emojiRow: {
    flexDirection: "row",
    gap: 20,
  },
  emojiWrapper: {
    opacity: 0.3,
  },
  selected: {
    opacity: 1,
  },
  unselected: {
    opacity: 0.3,
  },
  emoji: {
    fontSize: 24,
  },
});
