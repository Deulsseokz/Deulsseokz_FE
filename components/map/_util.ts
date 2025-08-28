import { ButtonVariant } from "@/constants/buttonTypes";
import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';
import { SheetHeaderConfig, SheetStep, StepButtonProps, StepParamMap, WithWhom } from './_type';

// SheetHeader 설정 매핑 레코드
export const StepHeaderMap: Record<SheetStep, SheetHeaderConfig> = {
  [SheetStep.INFO]: { showFavorite: true, showPlace: false, showBackButton: false },
  [SheetStep.WITH_WHOM]: { showFavorite: false, showPlace: true, showBackButton: true },
  [SheetStep.SELECT_FRIEND]: { showFavorite: false, showPlace: true, showBackButton: true },
  [SheetStep.SUBMIT]: { showFavorite: true, showPlace: false, showBackButton: false },
};

// PrimaryButton 텍스트 및 동적 상태 변경을 위한 함수 정의
export const StepButtonMap: Record<SheetStep, StepButtonProps> = {
  [SheetStep.INFO]: {
    text: '점령하기',
    getVariant: (_: Partial<StepParamMap>): ButtonVariant => ButtonVariant.Primary,
  },
  [SheetStep.WITH_WHOM]: {
    text: '다음',
    getVariant: (payloads: Partial<StepParamMap>): ButtonVariant => {
      // 값이 존재하면 enable된 버튼을, 그렇지 않으면 disable된 버튼을 리턴
      const val = payloads[SheetStep.WITH_WHOM];
      return val === 'ALONE' || val === 'FRIEND' ? ButtonVariant.Primary : ButtonVariant.Disable
    },
  },
  [SheetStep.SELECT_FRIEND]: {
    text: '다음',
    getVariant: (payloads: Partial<StepParamMap>): ButtonVariant => {
      // 값이 존재하면 enable된 버튼을, 그렇지 않으면 disable된 버튼을 리턴
      const selectedFriends = payloads[SheetStep.SELECT_FRIEND];
      return Array.isArray(selectedFriends) && selectedFriends.length > 0 ? ButtonVariant.Primary : ButtonVariant.Disable
    },
  },
  [SheetStep.SUBMIT]: {
    text: '촬영하기',
    getVariant: (_: Partial<StepParamMap>): ButtonVariant => ButtonVariant.Primary,
  },
};

// 2단계(WITHWHOM) - 옵션과 동적 이미지 매핑
export const WITH_WHOM_OPTIONS: WithWhom[] = [
  {
    whom: 'ALONE',
    label: '혼자',
    icon: {
      active: require('@/assets/images/map/options/alone-active.png'),
      inactive: require('@/assets/images/map/options/alone-inactive.png'),
    },
  },
  {
    whom: 'FRIEND',
    label: '친구와 함께',
    icon: {
      active: require('@/assets/images/map/options/friends-active.png'),
      inactive: require('@/assets/images/map/options/friends-inactive.png'),
    },
  },
];

export const takePhoto = async (): Promise<string | undefined> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('권한 필요', '카메라를 사용하려면 설정에서 권한을 허용해주세요.', [
      { text: '설정 열기', onPress: () => Linking.openSettings() },
      { text: '취소', style: 'cancel' },
    ]);
    return;
  }
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    selectionLimit: 1,
  });
  if (!result.canceled) {
    return result.assets[0].uri;
  }
};
