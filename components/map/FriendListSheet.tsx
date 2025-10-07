import { MyFriendListResponse } from '@/api/type';
import SearchBar from '@/components/common/SearchBar';
import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import FriendProfile from '../common/FriendProfile';
import { TopBar } from "../common/TopBar";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface FriendListSheetProps {
  visible: boolean; // 시트가 열려있는지
  onClose: () => void; // 시트 닫기 함수
  allFriends: MyFriendListResponse[]; // 전체 친구 목록
  selectedFriends: MyFriendListResponse[]; // 선택된 친구 목록
  updateSelection: (selected: MyFriendListResponse[]) => void; // 선택된 친구 목록 업데이트 함수
}

export default function FriendListSheet({
  visible,
  onClose,
  allFriends,
  selectedFriends,
  updateSelection,
}: FriendListSheetProps) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태

  // 시트 애니메이션
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  // 프론트 로컬 검색 필터링 로직
  const filteredFriends = useMemo(() => {
    if (!searchQuery) {
      return allFriends;
    }
    return allFriends.filter(friend =>
      friend.friendsName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allFriends]);

  // 선택된 친구 목록을 빠르게 조회
  const selectedFriendIds = useMemo(() => new Set(selectedFriends.map(f => f.userId)), [selectedFriends]);

   // 친구 선택/해제 핸들러
  const toggleSelection = (friend: MyFriendListResponse) => {
    const isSelected = selectedFriendIds.has(friend.userId);
    let newSelection;
    if (isSelected) {
      newSelection = selectedFriends.filter(f => f.userId !== friend.userId);
    } else {
      if (selectedFriends.length >= 3) {
        Alert.alert('최대 3명까지 선택할 수 있어요');
        return;
      }
      newSelection = [...selectedFriends, friend];
    }
    updateSelection(newSelection);
    onClose(); 
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
         <TopBar title="친구 목록" containerStyle={{paddingTop: 0}}  />
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="친구 이름을 검색하세요"
          transparent={true}
        />
        <View style={{paddingHorizontal: 10,}}>
            <Text style={styles.info}>친구 <Text style={styles.number}>{filteredFriends.length}</Text></Text>
        </View>
        <View>
        <FlatList
          horizontal
          data={filteredFriends}
          contentContainerStyle={styles.list}
          keyExtractor={item => item.userId.toString()}
          renderItem={({ item }) => (
            <View style={styles.friendRow}>
              <FriendProfile
                friend={item}
                isSelected={selectedFriendIds.has(item.userId)}
                onSelect={() => toggleSelection(item)}
              />
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>검색 결과가 없습니다.</Text>}
        />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10, // 기존 바텀시트 위에 오도록 zIndex 설정
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.7,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  info : {
    ...fontStyles.bold15,
  },
  number : {
     ...fontStyles.bold15,
     color: MCOLORS.grayscale.gray30,
  },
  friendRow: {
    paddingVertical: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
  list: {
    padding: 20,
    gap: 16,
    rowGap: 20,
    width: '100%',
    height: 'auto',
    borderRadius: 20,
  },
});