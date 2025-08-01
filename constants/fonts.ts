import { StyleSheet } from 'react-native';

/**
 * 멜로그 폰트 시스템
 */

// semibold, bold, medium, 
export const fontStyles = StyleSheet.create({
  bold20: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    lineHeight: 24,
  },
  bold17: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 17,
    lineHeight: 24,
  },
  medium17: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 17,
    lineHeight: 18,
  },
  bold15: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    lineHeight: 20,
  },
  medium15: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 15,
    lineHeight: 18,
  },
  caption: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 13,
    lineHeight: 20,
  },
});

export default fontStyles;
