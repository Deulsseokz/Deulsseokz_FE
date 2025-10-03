import { PolaroidPhoto } from '@/components/album/_type';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PhotoItem, { PhotoType } from './PhotoItem';

interface PhotoSelectorProps {
  /** 선택 가능한 사진 리스트 */
  photos: PolaroidPhoto[];
  /** 현재 선택된 사진 리스트 */
  selectedPhotos: PolaroidPhoto[];
  /** 사진을 선택했을 때 호출되는 콜백 */
  onSelectPhoto: (photo: PolaroidPhoto) => void;
  /** 최대 선택 가능한 사진 개수 */
  maxSelectCnt: number;
}

/**
 * 사진 선택 컴포넌트
 * - PhotoItem 컴포넌트를 그리드 형태로 표시하고, 선택된 사진은 강조 표시됨
 * - 최대 선택 가능한 사진 개수 제한
 */
export default function PhotoSelector({ photos, selectedPhotos, onSelectPhoto, maxSelectCnt }: PhotoSelectorProps) {
  const renderPhotoItem = ({ item: photo }: { item: PolaroidPhoto }) => {
    let type: PhotoType = 'normal';
    const isSelected = selectedPhotos.some(p => p.id === photo.id);

    if (photo.isFavorite) {
      type = 'dimmed'; // 대표 사진은 항상 비활성화
    } else if (isSelected) {
      type = 'selected';
    } else if (selectedPhotos.length >= maxSelectCnt) {
      type = 'dimmed';
    }

    return (
      <View style={styles.itemWrapper}>
        <PhotoItem image={photo.image} type={type} isFavorite={photo.isFavorite} onPress={() => onSelectPhoto(photo)} />
      </View>
    );
  };

  return (
    <FlatList
      data={photos}
      renderItem={renderPhotoItem}
      keyExtractor={item => item.id.toString()}
      numColumns={3}
      style={styles.grid}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    width: '100%',
  },
  itemWrapper: {
    flex: 1 / 3,
  },
});
