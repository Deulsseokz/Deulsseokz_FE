import { StyleSheet } from 'react-native';

/**
 * 멜로그 폰트 시스템
 */
export const fontStyles = StyleSheet.create({
  heading1: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 24,
    lineHeight: 28,
  },
  heading2: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    lineHeight: 24,
  },
  bodyLarge: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 17,
    lineHeight: 20,
  },
  bodyMedium: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    lineHeight: 18,
  },
  bodySmall: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
    lineHeight: 15,
  },
  caption: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 13,
    lineHeight: 15,
  },
});

export default fontStyles;
