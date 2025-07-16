import { MCOLORS } from '@/constants/Colors';
import { Friend } from '@/types/friend';
import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import FriendProfile from '../common/FriendProfile';

interface FriendSelectorProps {
  friends: Friend[];
  selected: Friend[];
  onChange: (selected: Friend[]) => void;
}

export default function FriendSelector({ friends, selected, onChange }: FriendSelectorProps) {
  const [selectedMap, setSelectedMap] = useState<Record<number, boolean>>(
    Object.fromEntries(selected.map(f => [f.userId, true])),
  );

  const toggle = (userId: number) => {
    const alreadySelected = !!selectedMap[userId];
    const nextSelectedCount = Object.values(selectedMap).filter(Boolean).length + (alreadySelected ? -1 : 1);

    if (!alreadySelected && nextSelectedCount > 3) {
      Alert.alert('최대 3명까지 선택할 수 있어요');
      return;
    }

    const next = { ...selectedMap, [userId]: !alreadySelected };
    setSelectedMap(next);

    const updatedFriends = friends.filter(f => next[f.userId]);
    onChange(updatedFriends);
  };

  return (
    <View>
      <View style={style.TopContainer}>
        <View style={style.titleContainer}>
          <Text style={style.title}>함께할 친구를 선택해주세요</Text>
          <Text style={style.counter}>{Object.values(selectedMap).filter(Boolean).length}</Text>
        </View>
        <Text style={style.limit}>최대 3명 가능</Text>
      </View>
      <FlatList
        horizontal
        data={friends}
        keyExtractor={item => item.userId.toString()}
        contentContainerStyle={style.list}
        renderItem={({ item }) => (
          <FriendProfile friend={item} isSelected={!!selectedMap[item.userId]} onSelect={toggle} />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  TopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: MCOLORS.grayscale.gray80,
  },
  counter: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    color: MCOLORS.brand.secondary,
  },
  limit: {
    color: MCOLORS.grayscale.gray30,
    fontSize: 15,
    fontWeight: '500',
  },
  list: {
    gap: 16,
    rowGap: 20,
    flexGrow: 1,
  },
});
