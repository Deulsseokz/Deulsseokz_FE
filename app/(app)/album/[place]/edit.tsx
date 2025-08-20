import { patchPhotoToAlbum } from '@/api/album';
import { PolaroidPhoto } from '@/components/album/_type';
import ModalManager from '@/components/common/Modal/ModalManager';
import AlbumEditTemplate from '@/components/template/AlbumEditTemplate';
import { ButtonVariant } from '@/constants/buttonTypes';
import { ModalType } from '@/enums/modalTypes';
import useModal from '@/hooks/useModal';
import { FeelingType } from '@/types/feeling';
import { WeatherType } from '@/types/weather';
import { getTokens } from '@/utils/tokenManager';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Image } from 'react-native';

/** config */
const feelings: FeelingType[] = ['😁', '😭', '😎', '🥰', '😛', '🥳'];
const weathers: WeatherType[] = ['☀️', '☁️', '☔️', '🌦️', '💨', '⛈️'];

export default function AlbumEditScreen() {
  /** router */
  const router = useRouter();
  const { photo, place } = useLocalSearchParams();
  const placeParam = useMemo(() => (Array.isArray(place) ? place[0] : place), [place]);
  /** state */
  const [selectedFeeling, setSelectedFeeling] = useState<FeelingType>('😁');
  const [selectedWeather, setSelectedWeather] = useState<WeatherType>('☀️');
  const [desc, setDesc] = useState('');
  /** variable */
  let parsedPhoto: PolaroidPhoto | null = null;
  const isSaveEnabled = desc.trim().length > 0;

  try {
    parsedPhoto = photo && typeof photo === 'string' ? JSON.parse(decodeURIComponent(photo)) : null;
  } catch (e) {
    console.error('error', e);
  }

  /** hooks */
  const {
    isShowing: isSaveModalVisible,
    modalType: saveModalType,
    modalProps: saveModalProps,
    show: showSaveModal,
    hide: hideSaveModal,
  } = useModal();

  const {
    isShowing: isCancelModalVisible,
    modalType: cancelModalType,
    modalProps: cancelModalProps,
    show: showCancelModal,
    hide: hideCancelModal,
  } = useModal();

  /** handler function (related router) */
  const handleSave = async () => {
    const requestBody = {
      photoId: Number(parsedPhoto?.id),
      feelings: selectedFeeling,
      weather: selectedWeather,
      photoContent: desc,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      const { accessToken } = await getTokens();
      const res = await patchPhotoToAlbum(requestBody, accessToken);

      if (res.isSuccess) {
        showSaveModal(ModalType.DEFAULT, {
          title: '오늘의 일기를 저장했어요',
          desc: '오늘도 행복한 추억을 만들었네요',
          children: (
            <Image source={require('@/assets/images/modal/icon-save-diary.png')} style={{ width: 80, height: 82 }} />
          ),
          buttons: {
            text: '확인',
            onPress: () => {
              hideSaveModal();
              router.push({
                pathname: '/album/[place]',
                params: { place: placeParam },
              });
            },
          },
        });
      } else {
        Alert.alert('에러', res.message);
      }
    } catch (e) {
      console.error('error', e);
    }
  };

  const handleCancel = () => {
    showCancelModal(ModalType.DEFAULT, {
      title: '저장하지 않고 나갈까요?',
      desc: '작성한 내용이 모두 사라져요',
      children: <Image source={require('@/assets/images/modal/icon-warning.png')} style={{ width: 80, height: 82 }} />,
      options: [
        {
          text: '취소',
          variant: ButtonVariant.Subtle,
          onPress: hideCancelModal,
        },
        {
          text: '나가기',
          variant: ButtonVariant.Primary,
          onPress: () => {
            hideCancelModal();
            router.push('/album/');
          },
        },
      ],
    });
  };

  /** lifecycle */
  useEffect(() => {
    if (parsedPhoto?.additional.desc) {
      setSelectedFeeling((parsedPhoto.additional.feeling as FeelingType) ?? '😁');
      setSelectedWeather((parsedPhoto.additional.weather as WeatherType) ?? '☀️');
      setDesc(parsedPhoto.additional.desc ?? '');
    }
  }, [photo]);

  return (
    <>
      <AlbumEditTemplate
        imageSource={parsedPhoto?.image}
        feelings={feelings}
        weathers={weathers}
        selectedFeeling={selectedFeeling}
        selectedWeather={selectedWeather}
        desc={desc}
        onChangeFeeling={setSelectedFeeling}
        onChangeWeather={setSelectedWeather}
        onChangeDesc={setDesc}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaveEnabled={isSaveEnabled}
      />
      <ModalManager
        isShowing={isSaveModalVisible}
        modalType={saveModalType}
        modalProps={saveModalProps}
        onClose={hideSaveModal}
      />
      <ModalManager
        isShowing={isCancelModalVisible}
        modalType={cancelModalType}
        modalProps={cancelModalProps}
        onClose={hideCancelModal}
      />
    </>
  );
}
