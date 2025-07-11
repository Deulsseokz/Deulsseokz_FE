import { MCOLORS } from '@/constants/Colors';
import { BtnKind, BtnSize } from '@/types/btnAttributes';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextStyle, ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

interface PrimaryButtonProps {
  kind: BtnKind;
  size?: BtnSize; // default: 'default'
  text: string; // 텍스트
  onPress: () => void; // 눌렀을 때 실행 함수
}

export function PrimaryButton({ kind, size = 'default', text, onPress }: PrimaryButtonProps) {
  const { buttonStyle, textStyle } = getButtonStyle({ kind, size });

  const isDisabled = kind === 'status-disabled';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.baseButton, buttonStyle]}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.baseText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    backgroundColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  baseText: {
    fontFamily: 'Pretendard-Semibold',
    fontSize: 15,
  },
});

function getButtonStyle({ kind, size = 'default' }: { kind: BtnKind; size: BtnSize }): {
  buttonStyle: ViewStyle;
  textStyle: TextStyle;
} {
  const isSmall = size === 'small';

  const baseStyle: ViewStyle = {
    width: isSmall ? 100 : 135,
    height: 44,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const kindMap: Record<BtnKind, { bg: string; text: string; borderColor?: string; borderWidth?: number }> = {
    'normal-selected': {
      bg: MCOLORS.brand.secondary,
      text: MCOLORS.grayscale.gray0,
    },
    'normal-dismiss': {
      bg: '#f3f3f3',
      text: MCOLORS.grayscale.gray30,
      borderColor: MCOLORS.grayscale.gray10,
      borderWidth: 1,
    },
    'status-enabled': {
      bg: MCOLORS.brand.secondary,
      text: MCOLORS.grayscale.gray0,
    },
    'status-disabled': {
      bg: MCOLORS.grayscale.gray30,
      text: MCOLORS.grayscale.gray0,
      borderColor: MCOLORS.grayscale.gray30,
      borderWidth: 1,
    },
  };

  const selected = kindMap[kind];

  return {
    buttonStyle: {
      ...baseStyle,
      backgroundColor: selected.bg,
      // 보더는 속성이 존재한다면 적용,
      ...(selected.borderColor && selected.borderWidth
        ? {
            borderColor: selected.borderColor,
            borderWidth: selected.borderWidth,
          }
        : {}),
    },
    textStyle: {
      color: selected.text,
    },
  };
}
