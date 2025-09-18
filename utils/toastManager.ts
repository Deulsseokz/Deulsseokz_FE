import Toast from 'react-native-toast-message';

/**
 * 성공 토스트 메시지 표시
 * @param text1 제목
 * @param text2 내용 (선택 사항)
 */
export const showSuccessToast = (text1: string, text2?: string) => {
  Toast.show({
    type: 'success',
    text1,
    text2,
    position: 'top',
    visibilityTime: 3000,
  });
};

/**
 * 에러 토스트 메시지 표시
 * @param text1 제목
 * @param text2 내용 (선택 사항)
 */
export const showErrorToast = (text1: string, text2?: string) => {
  Toast.show({
    type: 'error',
    text1,
    text2,
    position: 'top',
    visibilityTime: 3000,
  });
};

/**
 * 커스텀 토스트 메세지 표시
 * @param text1 제목
 * @param text2 내용 (선택 사항)
 */
export const showCustomToast = (text1: string, text2?: string) => {
  Toast.show({
    type: 'customError',
    text1,
    text2,
    position: 'top',
    visibilityTime: 3000,
  });
};
