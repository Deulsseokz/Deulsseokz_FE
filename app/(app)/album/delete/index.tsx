import { deletePhoto, getAlbumByPlace } from '@/api/album';
import { PhotoItem } from '@/api/type';
import { PolaroidPhoto } from '@/components/album/_type';
import ModalManager from '@/components/common/Modal/ModalManager';
import AlbumDeleteTemplate from '@/components/template/AlbumDeleteTemplate';
import { ButtonVariant } from '@/constants/buttonTypes';
import { ModalType } from '@/enums/modalTypes';
import useModal from '@/hooks/useModal';
import { FeelingType } from '@/types/feeling';
import { WeatherType } from '@/types/weather';
import { Image } from 'expo-image';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';

export default function AlbumDeleteScreen() {
  /** router */
  const router = useRouter();
  const { place } = useLocalSearchParams<{ place: string }>();
  const placeParam = useMemo(
    () => (place ? decodeURIComponent(Array.isArray(place) ? place[0] : place) : ''),
    [place],
  );

  /** state */
  const [photos, setPhotos] = useState<PolaroidPhoto[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<PolaroidPhoto[]>([]);

  /** hooks */
  const {
    isShowing: isModalVisible,
    modalType,
    modalProps,
    show: showModal,
    hide: hideModal,
  } = useModal();

  /** API util */
  const transformPhoto = (photo: PhotoItem): PolaroidPhoto => ({
    id: photo.photoId,
    image: { uri: photo.url },
    additional: {
      weather: (photo.weather ?? '') as WeatherType,
      feeling: (photo.feelings ?? '') as FeelingType,
      desc: photo.photoContent ?? '',
    },
    date: photo.date ?? '',
    loc: placeParam ?? '',
  });

  /** API fetch */
  const fetchPhotos = useCallback(async () => {
    if (!placeParam) return;
    try {
      const res = await getAlbumByPlace(placeParam);
      if (res.isSuccess) {
        const transformed = res.result.map(transformPhoto);
        setPhotos(transformed);
      }
    } catch (e) {
      console.error('API 호출 실패', e);
    }
  }, [placeParam]);

  /** handler function */
  const handleSelect = (photo: PolaroidPhoto) => {
    const isSelected = selectedPhotos.find(p => p.id === photo.id);
    if (isSelected) {
      setSelectedPhotos(selectedPhotos.filter(p => p.id !== photo.id));
    } else {
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  const handleSelectAll = () => {
    // 전체 선택/해제 토글 로직
    if (selectedPhotos.length === photos.length) {
      setSelectedPhotos([]);
    } else {
      setSelectedPhotos(photos);
    }
  };

  const handleDeletePress = () => {
    if (selectedPhotos.length === 0) return;

    showModal(ModalType.DEFAULT, {
      title: '선택한 사진을 삭제할까요?',
      desc: '삭제는 되돌릴 수 없어요.',
      children: (
        <Image
          source={require('@/assets/images/modal/icon-warning.png')}
          style={{ width: 80, height: 82 }}
        />
      ),
      options: [
        { text: '취소', variant: ButtonVariant.Subtle, onPress: hideModal },
        {
          text: '삭제',
          variant: ButtonVariant.Primary,
          onPress: async () => {
            try {
              const idsToDelete = selectedPhotos.map(p => p.id);
              const res = await deletePhoto(idsToDelete);
              if (!res.isSuccess) throw new Error(res.message);
              router.back();
            } catch (e) {
              console.error('삭제 실패:', e);
            } finally {
              hideModal();
            }
          },
        },
      ],
    });
  };

  /** lifecycle */
  useFocusEffect(
    useCallback(() => {
      fetchPhotos();
    }, [fetchPhotos]),
  );

  return (
    <>
      <AlbumDeleteTemplate
        albumTitle={placeParam || ''}
        selectedPhotos={selectedPhotos}
        photos={photos}
        onSelectPhoto={handleSelect}
        onSelectAll={handleSelectAll}
        onPressDelete={handleDeletePress}
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
