import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

/**
 * 
 * @returns 사진첩에서 이미지를 선택하여 URI를 반환, 취소 시 undefined 반환
 */
const pickImageFromLibrary = async (): Promise<string | undefined> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('권한 필요', '사진을 사용하려면 설정에서 권한을 허용해주세요.', [
      { text: '설정 열기', onPress: () => Linking.openSettings() },
      { text: '취소', style: 'cancel' },
    ]);
    return;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    selectionLimit: 1,
  });
  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

export default pickImageFromLibrary;