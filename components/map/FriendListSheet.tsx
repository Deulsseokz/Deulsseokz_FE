import { MyFriendListResponse } from '@/api/type';
import CheckIcn from "@/assets/icons/icon-check.svg";
import SearchBar from '@/components/common/SearchBar';
import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import FriendProfile from '../common/FriendProfile';
import { TopBar } from "../common/TopBar";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface FriendListSheetProps {
  visible: boolean;
  onClose: () => void;
  allFriends: MyFriendListResponse[];
  selectedFriends: MyFriendListResponse[];
  updateSelection: (selected: MyFriendListResponse[]) => void;
}

export default function FriendListSheet({
  visible,
  onClose,
  allFriends,
  selectedFriends,
  updateSelection,
}: FriendListSheetProps) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const filteredFriends = useMemo(() => {
    if (!searchQuery) return allFriends;
    return allFriends.filter(friend =>
      friend.friendsName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allFriends]);

  const selectedFriendIds = useMemo(() => 
    new Set(selectedFriends.map(f => f.userId)), 
    [selectedFriends]
  );

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
  };
  
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType="fade"
    >
      <Pressable style={styles.overlay} onPress={onClose} />

      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        <TopBar title="친구 목록" onBack={onClose} containerStyle={{ paddingTop: 0 }} rightButton={<CheckIcn width={30} height={30}/>} onRightPress={onClose} />
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="친구 이름을 검색하세요"
          transparent={true}
        />
        <View style={styles.infoHeader}>
          <Text style={styles.info}>친구 <Text style={styles.number}>{filteredFriends.length}</Text></Text>
        </View>
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
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    paddingVertical: 20,
  },
  infoHeader: {
    paddingHorizontal: 30
  },
  info: {
    ...fontStyles.bold15,
  },
  number: {
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
    width: SCREEN_WIDTH * 0.9,
  },
  list: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    gap: 16,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    marginTop: 'auto',
    paddingBottom: 10,
  },
});