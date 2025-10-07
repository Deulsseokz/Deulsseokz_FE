import { getMyFriendsList } from "@/api/myPageDTO";
import { MyFriendListResponse } from "@/api/type";
import { MCOLORS } from '@/constants/colors';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FriendProfile from '../common/FriendProfile';

interface FriendSelectorProps {
  selected: MyFriendListResponse[]; // 선택된 친구 배열
  updateValue: (selected: MyFriendListResponse[]) => void;
  onShowFriendListSheet: () => void;
}

/**
 * @param 친구 목록, 선택된 친구 배열, 친구 선택시 핸들러 함수
 * @returns 친구 목록 중 최대 3명 선택할 수 있는 컴포넌트
 */
export default function FriendSelector({ selected, updateValue, onShowFriendListSheet }: FriendSelectorProps) {
  const [friends, setFriends] = useState<MyFriendListResponse[]>([]);

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
    updateValue(updatedFriends);
  };

  useEffect(()=>{
    getMyFriendsList().then(res => {
      setFriends(res.result);
    })
  }, [])

  useEffect(() => {
    const newSelectedMap = Object.fromEntries(selected.map(f => [f.userId, true]));
    setSelectedMap(newSelectedMap);
  }, [selected]);

  return (
    <View style={style.container}>
      <View style={style.topContainer}>
        <View style={style.titleContainer}>
          <Text style={style.title}>함께할 친구를 선택해주세요</Text>
          <Text style={style.counter}>{Object.values(selectedMap).filter(Boolean).length}</Text>
        </View>
        <Text style={style.limit}>최대 3명 가능</Text>
      </View>
      <View style={style.list}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={friends}
          contentContainerStyle={style.scrollList}
          keyExtractor={item => item.userId.toString()}
          renderItem={({ item }) => (
            <FriendProfile friend={item} isSelected={!!selectedMap[item.userId]} onSelect={toggle} />
          )}
        />
      </View>
     
       <TouchableOpacity onPress={onShowFriendListSheet} style={style.bottomText}>
          <Text style={style.showAllText}>모두보기</Text>
        </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
  },
  topContainer: {
    width: '100%',
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
    marginTop: 30,
    padding: 20,
    gap: 16,
    rowGap: 20,
    width: '100%',
    height: 'auto',
    backgroundColor: '#FBFBFB',
    borderRadius: 20,
  },
  scrollList: {
    marginLeft: 10,
  },
  showAllText: { 
    color: MCOLORS.grayscale.gray50,
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  bottomText: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 8,
    paddingRight: 4,
  }
});
