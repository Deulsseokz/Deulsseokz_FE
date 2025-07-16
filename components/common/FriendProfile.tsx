import IconPersonSelected from '@/assets/icons/icon-person-selected.svg';
import IconPerson from '@/assets/icons/icon-person.svg';
import { MCOLORS } from '@/constants/Colors';
import { Friend } from '@/types/friend';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// FriendProfile의 재사용성을 위해 도입한 프로필 사진+이름 컴포넌트
interface FriendProfileProps {
  friend: Friend;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export default function FriendProfile({ friend, isSelected, onSelect }: FriendProfileProps) {
  const Icon = isSelected ? IconPersonSelected : IconPerson;

  return (
    <TouchableOpacity style={style.container} onPress={() => onSelect(friend.userId)}>
      <Icon width={40} height={40} />
      <Text style={style.name}>{friend.userName}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    // svg 정상화 이후 삭제,
    width: 40,
    height: 65,
  },
  name: {
    color: MCOLORS.grayscale.gray80,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 20,
  },
});
