import IcnBack from '@/assets/icons/icon-back.svg';
import IcnSearch from '@/assets/icons/icon-search.svg';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  onBack?: () => void; // 뒤로가기 버튼을 표시하고 동작을 지정 (선택적)
  onSearch?: (input: string) => void; // 검색 동작을 지정
  placeholder?: string; // 입력 필드의 플레이스홀더 텍스트
  transparent?: boolean; // 배경 투명 여부
}

export default function SearchBar({ onBack, onSearch, placeholder, transparent=false }: SearchBarProps) {
  const [input, setInput] = useState('');

  return (
    <View style={style.container}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={style.backButton}>
          <IcnBack />
        </TouchableOpacity>
      )}
      <View style={[  style.searchContainer, transparent ? style.transparent : {}]}>
        <TextInput
          placeholder={placeholder || "검색어를 입력하세요"}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => onSearch && onSearch(input)}
          returnKeyType="search"
          clearButtonMode="while-editing"
          placeholderTextColor={'#FFBACA'}
          style={[style.input]}
        />
        <TouchableOpacity
          onPress={() => onSearch && onSearch(input)}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe9ee',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 16,
  },
  transparent : {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#F76F8E',
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 15,
  },
});