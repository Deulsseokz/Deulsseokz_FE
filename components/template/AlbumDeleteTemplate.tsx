import PhotoSelector from '@/components/album/PhotoSelector';
import { TopBar } from '@/components/common/TopBar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PolaroidPhoto } from '../album/_type';

interface AlbumDeleteTemplateProps {
  selectedPhotos: PolaroidPhoto[];
  albumTitle: string;
  photos: PolaroidPhoto[];
  onSelectPhoto: (photo: PolaroidPhoto) => void;
  onSelectAll: () => void;
  onPressDelete: () => void;
}

/**
 * 앨범 삭제 템플릿 - 사진 선택
 */
export default function AlbumDeleteTemplate({
  selectedPhotos,
  photos,
  onSelectPhoto,
  onPressDelete,
  onSelectAll,
  albumTitle,
}: AlbumDeleteTemplateProps) {
  const isDeleteEnabled = selectedPhotos.length > 0;

  return (
    <View style={styles.page}>
      <TopBar title={albumTitle} />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerSection}>
            <Text style={styles.title}>사진</Text>
            <Text style={styles.limit}>{photos.length}</Text>
          </View>
          <View style={styles.headerSection}>
            <TouchableOpacity onPress={onSelectAll}>
              <Text style={styles.bold}>전체 선택</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressDelete} disabled={!isDeleteEnabled}>
              <Text style={[styles.count, !isDeleteEnabled && styles.disabledText]}>
                {selectedPhotos.length} <Text style={styles.bold}>삭제</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.wrapper}>
          <PhotoSelector
            photos={photos.map(p => p.image)}
            selectedPhotos={selectedPhotos.map(p => p.image)}
            onSelectPhoto={selectedImage => {
              const matched = photos.find(
                p =>
                  typeof p.image === 'object' &&
                  p.image !== null &&
                  'uri' in p.image &&
                  'uri' in selectedImage &&
                  p.image.uri === selectedImage.uri,
              );
              if (matched) {
                onSelectPhoto(matched);
              }
            }}
            maxSelectCnt={photos.length}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#313131',
  },
  bold: {
    fontSize: 15,
    fontWeight: '700',
    color: '#313131',
  },
  count: {
    color: '#FF6B9A',
    fontSize: 15,
    fontWeight: '500',
    paddingLeft: 8,
  },
  disabledText: {
    color: '#ACACAC',
  },
  limit: {
    color: '#ACACAC',
    fontSize: 15,
    fontWeight: '500',
    paddingLeft: 6,
  },
  wrapper: {
    flex: 1,
    width: '100%',
  },
});
