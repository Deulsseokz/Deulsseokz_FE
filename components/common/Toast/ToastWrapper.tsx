import fontStyles from '@/constants/fonts';
import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Toast } from './Toast';

/**
 * 각 토스트 상세 옵션 config
 * * 종류: success, error, customError
 */
export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      text1Style={{ color: '#4A4A4A', ...fontStyles.bold15 }}
      text2Style={{ color: '#7A7A7A', ...fontStyles.medium13 }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{ color: '#4A4A4A', ...fontStyles.bold15 }}
      text2Style={{ color: '#7A7A7A', ...fontStyles.medium13 }}
    />
  ),

  customError: (props: any) => <Toast {...props} />,
};
