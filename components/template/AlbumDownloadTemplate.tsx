import { PolaroidPhoto } from '@/components/album/_type';
import Polaroid from '@/components/album/Polaroid';
import ModalManager from '@/components/common/Modal/ModalManager';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { TopBar } from '@/components/common/TopBar';
import { ModalType } from '@/enums/modalTypes';
import useModal from '@/hooks/useModal';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface AlbumDownloadTemplateProps {
  photo: PolaroidPhoto;
  albumTitle: string;
  cnt: {
    curr: string;
    tot: string;
  };
}

/** 앨범 다운로드 템플릿
 * @param photo - 다운로드할 사진 정보
 * @param albumTitle - 앨범 제목
 * @param cnt - 다운로드 횟수 정보 (현재, 총)
 */
export default function AlbumDownloadTemplate({ photo, albumTitle, cnt }: AlbumDownloadTemplateProps) {
  const { isShowing, modalType, modalProps, show, hide } = useModal();

  const handleDownload = () => {
    show(ModalType.DEFAULT, {
      title: '사진을 갤러리에 저장했어요',
      children: <Image source={require('@/assets/images/modal/icon-picture.png')} style={{ width: 80, height: 82 }} />,
      buttons: {
        text: '닫기',
        onPress: hide,
      },
    });
  };

  return (
    <View style={styles.page}>
      <TopBar title={albumTitle} />
      <View style={styles.container}>
        <Polaroid photo={photo} />
        <View>
          <Text style={styles.label}>
            남은 횟수 ( {cnt.curr} / {cnt.tot} )
          </Text>
          <PrimaryButton text="다운로드" onPress={handleDownload} kind="status-enabled" />
        </View>
        <ModalManager isShowing={isShowing} modalType={modalType} modalProps={modalProps} onClose={hide} />
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
