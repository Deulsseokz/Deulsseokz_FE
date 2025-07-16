import IcnSearch from '@/assets/icons/icon-locationSearch.svg';
import { TouchableOpacity } from 'react-native';

interface SearchLocationBtnProps {
  onPress: () => void;
}

export default function SearchLocationBtn({ onPress }: SearchLocationBtnProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <IcnSearch width={44} height={44} />
    </TouchableOpacity>
  );
}
