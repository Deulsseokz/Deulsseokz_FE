import BackIcn from '@/assets/icons/icon-back.svg';
import { TouchableOpacity } from 'react-native';

interface BackBtnProps {
  onBack: () => void;
}

// 백버튼, 사이즈 고정
export default function BackBtn({ onBack }: BackBtnProps) {
  return (
    <TouchableOpacity onPress={onBack}>
      <BackIcn width={28} height={28} />
    </TouchableOpacity>
  );
}
