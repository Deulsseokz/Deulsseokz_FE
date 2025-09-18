import BackBang from '@/assets/icons/icon-bang.svg';
import fontStyles from '@/constants/fonts';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * 토스트 모달 프롭
 * * `react-native-toast-message` 사용
 * * 라이브러리 props명 그대로 사용
 */
interface ToastProps {
  text1?: string;
  text2?: string;
}

/**
 * 3초 duration을 갖는 토스트 모달
 * @see utils/toastManager.ts
 * @see components/common/Toast/ToastWrapper.tsx
 */
export const Toast = ({ text1, text2 }: ToastProps) => (
  <View style={styles.toastContainer}>
    <BackBang width={24} height={24} />
    <View style={styles.textContainer}>
      {text1 && <Text style={styles.text1}>{text1}</Text>}
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    minHeight: 65,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    // 그림자 (iOS)
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    // 그림자 (Android)
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    color: '#4A4A4A',
    ...fontStyles.bold15,
  },
  text2: {
    ...fontStyles.medium13,
    color: '#7A7A7A',
  },
});
