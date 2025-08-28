import { PolaroidPhoto } from '@/components/album/_type';
import Polaroid from '@/components/album/Polaroid';
import { PrimaryButton } from '@/components/common/Button/PrimaryButton';
import { TopBar } from '@/components/common/TopBar';
import { ButtonVariant } from '@/constants/buttonTypes';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AlbumDownloadTemplateProps {
  photo: PolaroidPhoto;
  albumTitle: string;
  cnt: {
    curr: number;
    tot: number;
  };
  imageRef: React.RefObject<View | null>;
  onPressDownload: () => void;
}

export default function AlbumDownloadTemplate({
  photo,
  albumTitle,
  cnt,
  imageRef,
  onPressDownload,
}: AlbumDownloadTemplateProps) {
  return (
    <View style={styles.page}>
      <TopBar title={albumTitle} />
      <View style={styles.container}>
        <View ref={imageRef} collapsable={false} style={{ backgroundColor: 'transparent' }}>
          <Polaroid photo={photo} />
        </View>
        <View>
          <Text style={styles.label}>
            남은 횟수 ( {cnt.curr} / {cnt.tot} )
          </Text>
          <PrimaryButton
            text="다운로드"
            onPress={onPressDownload}
            variant={ButtonVariant.Primary}
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
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#7A7A7A',
    marginVertical: 20,
    textAlign: 'center',
  },
});
