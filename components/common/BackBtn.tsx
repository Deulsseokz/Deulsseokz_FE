import BackIcn from '@/assets/icons/icon-back.svg';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

// 백버튼, 사이즈 고정
export default function BackBtn() {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <BackIcn width={28} height={28} />
    </TouchableOpacity>
  );
}
