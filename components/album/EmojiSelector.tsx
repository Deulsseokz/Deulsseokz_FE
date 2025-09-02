import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.emojiRow}
      >
        {options.map(opt => {
          const isSelected = selected === opt;
          const isNone = opt === ('없음' as T);

          return (
            <TouchableOpacity
              key={opt}
              onPress={() => onSelect(opt)}
              style={[
                styles.emojiWrapper,
                isSelected ? styles.selectedWrapper : styles.unselectedWrapper,
              ]}
            >
              <Text
                style={[
                  styles.emoji,
                  isNone ? styles.noneEmoji : styles.normalEmoji,
                  !isSelected && styles.unselectedEmoji,
                ]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  selector: {
    width: '100%',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 11,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4A4A4A',
    width: 36,
  },
  emojiRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  emojiWrapper: {
    width: 44,
    height: 44,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedWrapper: {
    borderColor: '#E5E5E5',
    backgroundColor: '#F5F5F5',
    opacity: 1,
  },
  unselectedWrapper: {
    borderColor: 'transparent',
    opacity: 0.7,
  },
  emoji: {
    textAlign: 'center',
  },
  normalEmoji: {
    fontSize: 24,
  },
  noneEmoji: {
    fontSize: 13,
    color: '#666',
  },
  unselectedEmoji: {
    opacity: 0.7,
  },
});
