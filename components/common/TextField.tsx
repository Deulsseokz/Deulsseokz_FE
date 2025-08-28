import { MCOLORS } from "@/constants/colors";
import React from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

type Props = {
    // 텍스트 value
  value: string;
    // 텍스트 변경시 호출 함수
  onChangeText: (t: string) => void;
    // placeholder
  placeholder?: string;
    // 최대 길이, default: 20
  maxLength?: number;
    // 우측 액션 버튼 (opt)
  rightButton?: React.ReactNode; // 입력 필드 우측 액션 버튼
};

/**
 * 공통 텍스트 필드
 */
export default function TextField({
  value,
  onChangeText,
  placeholder,
  maxLength = 20,
  rightButton,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          allowFontScaling={false}
          {...(Platform.OS === 'android' ? {
            includeFontPadding: false,
            textAlignVertical: 'center' as const,
          } : {})}
        />
        {rightButton ? <View style={styles.right}>{rightButton}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  label: { fontSize: 14, marginBottom: 8, color: '#222' },
  inputRow: {
    height: 36,
    borderBottomColor: MCOLORS.brand.secondary,
    borderBottomWidth:1,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: '#FFF',
  },
  inputRowError: {
    borderColor: '#E53935',
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 8,
    color: MCOLORS.brand.secondary,
  },
  right: {
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
