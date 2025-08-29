import { getAlbumByPlace, patchRepresentativePhoto } from '@/api/album';
import { PhotoItem } from '@/api/type';
import IcnDownload from '@/assets/icons/icon-download-pink.svg';
import IcnEdit from '@/assets/icons/icon-edit-pink.svg';
import IcnShare from '@/assets/icons/icon-share-pink.svg';
import IcnStar from '@/assets/icons/icon-star-pink.svg';
import { PolaroidPhoto } from '@/components/album/_type';
import ModalManager from '@/components/common/Modal/ModalManager';
import AlbumIdTemplate from '@/components/template/AlbumIdTemplate';
import { ModalType } from '@/enums/modalTypes';
import useModal from '@/hooks/useModal';
import { FeelingType } from '@/types/feeling';
import { WeatherType } from '@/types/weather';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';

export default function AlbumIdScreen() {
  /** router */
  const router = useRouter();
  const { place } = useLocalSearchParams();
  const placeParam = useMemo(() => (Array.isArray(place) ? place[0] : place), [place]);

  /** state */
  const [photos, setPhotos] = useState<PolaroidPhoto[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  /** variable */
  const selectedPhoto = photos[activeIndex];

  /** hooks */
  const {
    isShowing: isModalVisible,
    modalType,
    modalProps,
    show: showModal,
    hide: hideModal,
  } = useModal();

  /** API util */
  const transformPhoto = useCallback(
    (photo: PhotoItem): PolaroidPhoto => ({
      id: photo.photoId,
      image: { uri: photo.url },
      additional: {
        weather: (photo.weather ?? '') as WeatherType,
        feeling: (photo.feelings ?? '') as FeelingType,
        desc: photo.photoContent ?? '',
        people:
          photo.people?.map(p => ({
            id: p.id,
            name: p.name,
            avatar: p.uri
              ? { uri: p.uri }
              : require('@/assets/images/album/black-profile-small.png'),
          })) || [],
      },
      date: photo.date ?? '',
      loc: placeParam ?? '',
    }),
    [placeParam],
  );

  const fetchPhotos = useCallback(async () => {
    if (!placeParam) return;
    try {
      const res = await getAlbumByPlace(placeParam);
      if (res.isSuccess) {
        const transformed = res.result.map(transformPhoto);
        setActiveIndex(0); //캐러셀 맨 앞 카드로
        setPhotos(transformed);
      }
    } catch (e) {
      console.error('API 호출 실패', e);
    }
  }, [placeParam, transformPhoto]);

  /** handler function (related router) */
  //수정하기
  const handleEdit = () => {
    if (!selectedPhoto) return;

    const photoString = encodeURIComponent(JSON.stringify(selectedPhoto));
    router.push({
      pathname: '/album/[place]/edit',
      params: { place: placeParam, photo: photoString },
    });
  };

  //다운로드
  const handleDownload = () => {
    if (!selectedPhoto) return;

    const photoString = encodeURIComponent(JSON.stringify(selectedPhoto));
    router.push({
      pathname: '/album/[place]/download',
      params: { place: placeParam, photo: photoString },
    });
  };

  //공유하기
  const handleShare = () => {
    if (!selectedPhoto) return;

    const photoString = encodeURIComponent(JSON.stringify(selectedPhoto));
    router.push({
      pathname: '/album/share',
      params: {
        place: placeParam,
        photo: photoString,
      },
    });
  };

  //대표사진변경
  const handleRepresentative = async () => {
    if (!selectedPhoto) return;
    try {
      const res = await patchRepresentativePhoto(selectedPhoto.id);
      if (!res.isSuccess) throw new Error(res.message);
      await fetchPhotos();
      showModal(ModalType.DEFAULT, {
        title: '대표 사진을 변경했어요',
        children: (
          <Image
            source={require('@/assets/images/modal/icon-picture.png')}
            style={{ width: 80, height: 82 }}
          />
        ),
        buttons: {
          text: '확인',
          onPress: hideModal,
        },
      });
    } catch (e) {
      console.error('대표 사진 변경 실패:', e);
    }
  };

  //사진추가
  const handleAdd = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진을 추가하려면 갤러리 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      router.push({
        pathname: '/album/[place]/edit',
        params: { place: placeParam, newImageUri },
      });
    }
  };

  //사진삭제
  const handleDelete = () => {
    if (!placeParam) return;
    router.push({
      pathname: '/album/delete',
      params: { place: placeParam },
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
      <AlbumIdTemplate
        photos={photos}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        albumTitle={placeParam || ''}
        actions={[
          { label: '수정', icon: <IcnEdit />, onPress: handleEdit },
          { label: '공유', icon: <IcnShare />, onPress: handleShare },
          { label: '저장', icon: <IcnDownload />, onPress: handleDownload },
          { label: '대표 사진 설정', icon: <IcnStar />, onPress: handleRepresentative },
        ]}
        menu={[
          { label: '사진 추가', onPress: handleAdd },
          { label: '사진 삭제', onPress: handleDelete },
        ]}
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
