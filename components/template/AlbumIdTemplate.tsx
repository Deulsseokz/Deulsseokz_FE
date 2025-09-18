import IcnMore from '@/assets/icons/icon-more.svg';
import PhotoSetCarousel from '@/components/album/PhotoSetCarousel';
import Dropdown from '@/components/common/Dropdown';
import { TopBar } from '@/components/common/TopBar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PolaroidPhoto } from '../album/_type';

/** 캐서렐 하단에 표시될 액션 버튼
 * - label: 버튼 라벨
 * - icon: 버튼 아이콘 (React Node)
 * - onPress: 버튼 클릭 시 핸들러
 */
interface ActionItem {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}

/** 앨범 상세 보기 템플릿 props */
interface Props {
  photos: PolaroidPhoto[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  albumTitle: string;
  /** 하단 액션 버튼들 */
  actions: ActionItem[];
  /** 드롭다운 메뉴 옵션 */
  menu: {
    label: string;
    onPress: () => void;
  }[];
}

/**
 * 앨범 상세 보기 템플릿
 */
export default function AlbumIdTemplate({
  photos,
  activeIndex,
  setActiveIndex,
  albumTitle,
  actions,
  menu,
}: Props) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const openMenu = () => setDropdownVisible(true);
  const closeMenu = () => setDropdownVisible(false);

  const handleSelect = (action: () => void) => {
    action();
    closeMenu();
  };

  return (
    <>
      <View style={styles.page}>
        <TopBar title={albumTitle} rightButton={<IcnMore />} onRightPress={openMenu} />
        <View style={styles.container}>
          <PhotoSetCarousel
            photos={photos}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          <View style={styles.icon_container}>
            {actions.map((btn, idx) => (
              <TouchableOpacity key={idx} onPress={btn.onPress} style={styles.icon_button}>
                <View style={styles.icon_circle}>{btn.icon}</View>
                <Text style={styles.icon_text}>{btn.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {dropdownVisible && (
        <Dropdown
          visible={dropdownVisible}
          onClose={closeMenu}
          options={menu.map(item => ({
            label: item.label,
            onPress: () => handleSelect(item.onPress),
          }))}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  icon_container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon_button: {
    width: 80,
    height: 75,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon_circle: {
    width: 44,
    height: 44,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon_text: {
    fontSize: 13,
    color: '#7A7A7A',
  },
});
