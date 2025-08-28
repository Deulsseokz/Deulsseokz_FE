import { PolaroidPhoto } from '@/components/album/_type';
import ModalManager from '@/components/common/Modal/ModalManager';
import AlbumDownloadTemplate from '@/components/template/AlbumDownloadTemplate';
import { ModalType } from '@/enums/modalTypes';
import useModal from '@/hooks/useModal';
import * as MediaLibrary from 'expo-media-library';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Image, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';

export default function AlbumDownloadScreen() {
  /** router */
  const { photo, place } = useLocalSearchParams();

  /** state */
  const [downloadCount, setDownloadCount] = useState({ curr: 3, tot: 5 });

  /** refs */
  const viewToCaptureRef = useRef<View>(null);

  /** hooks */
  const {
    isShowing: isModalVisible,
    modalType,
    modalProps,
    show: showModal,
    hide: hideModal,
  } = useModal();

  /** variable */
  let parsedPhoto: PolaroidPhoto | null = null;
  try {
    parsedPhoto = photo && typeof photo === 'string' ? JSON.parse(decodeURIComponent(photo)) : null;
  } catch (e) {
    console.error('사진 파싱 실패:', e);
  }

  /** handler function */
  const handleDownload = async () => {
    try {
      if (!viewToCaptureRef.current) return;

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('권한 필요', '사진을 저장하려면 갤러리 접근 권한이 필요합니다.');
        return;
      }

      const localUri = await captureRef(viewToCaptureRef, {
        quality: 1.0,
        format: 'png',
      });

      await MediaLibrary.saveToLibraryAsync(localUri);

      // TODO: 다운로드 성공 시 API로 횟수 차감 요청 필요
      // setDownloadCount(prev => ({ ...prev, curr: prev.curr - 1 }));

      showModal(ModalType.DEFAULT, {
        title: '사진을 갤러리에 저장했어요',
        children: (
          <Image
            source={require('@/assets/images/modal/icon-picture.png')}
            style={{ width: 80, height: 82 }}
          />
        ),
        buttons: {
          text: '닫기',
          onPress: hideModal,
        },
      });
    } catch (e) {
      console.error('다운로드 실패:', e);
      Alert.alert('오류', '사진을 저장하는 데 실패했습니다.');
    }
  };

  if (!parsedPhoto) return null;

  return (
    <>
      <AlbumDownloadTemplate
        photo={parsedPhoto}
        albumTitle={place as string}
        cnt={downloadCount}
        imageRef={viewToCaptureRef}
        onPressDownload={handleDownload}
      />
      <ModalManager
        isShowing={isModalVisible}
        modalType={modalType}
        modalProps={modalProps}
        onClose={hideModal}
      />
    </>
  );
}
