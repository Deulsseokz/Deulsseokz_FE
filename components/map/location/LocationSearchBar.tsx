import IcnSearch from '@/assets/icons/icon-search.svg';
import BackBtn from '@/components/common/BackBtn';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface LocationSearchBarProps {
  // 검색을 눌렀을 때 fetch 이후 이동
  onSearchBtn: (input: string) => void;
}

/**
 *
 * @param param0 검색을 눌렀을 때 스크린 이동을 지원하는 함수
 * @returns 지역/장소 검색바 컴포넌트
 */
export default function LocationSearchBar({ onSearchBtn }: LocationSearchBarProps) {
  const [input, setInput] = useState('');

  return (
    <View style={style.container}>
      <BackBtn onBack={() => router.back()} />
      <View style={style.searchContainer}>
        <TextInput
          style={style.input}
          placeholder="지역이나 장소를 입력하세요"
          value={input}
          onChangeText={setInput}
          returnKeyType="search"
          clearButtonMode="while-editing"
          placeholderTextColor={'#FFBACA'}
        />
        <TouchableOpacity
          onPress={() => {
            onSearchBtn(input);
          }}
          style={{ flex: 0 }}
        >
          <IcnSearch />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffe9ee',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
    margin: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
