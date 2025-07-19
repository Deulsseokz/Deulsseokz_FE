import IcnMore from '@/assets/icons/icon-more.svg';
import PhotoSetCarousel from '@/components/album/PhotoSetCarousel';
import Dropdown from '@/components/common/Dropdown';
import { TopBar } from '@/components/common/TopBar';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PolaroidPhoto } from '../album/_type';

interface Props {
  photos: PolaroidPhoto[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onEdit: () => void;
  onDownload: () => void;
  albumTitle: string;
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
  onEdit,
  onDownload,
  albumTitle,
  menu
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
          <View style={styles.icon_container}>
            <TouchableOpacity onPress={onEdit} style={styles.icon_button}>
              <Image source={require('@/assets/images/icon/icon-edit.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDownload} style={styles.icon_button}>
              <Image source={require('@/assets/images/icon/icon-download.png')} />
            </TouchableOpacity>
          </View>
          <PhotoSetCarousel
            photos={photos}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </View>
      </View>

      {dropdownVisible && (
        <Dropdown
          visible={dropdownVisible}
          onClose={closeMenu}
          options={menu.map((item) => ({
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
    backgroundColor: '#fff',
  },
  icon_container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 11,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
  },
  icon_button: {
    width: 24,
    height: 24,
  },
});
