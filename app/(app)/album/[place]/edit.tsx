import { patchPhotoToAlbum, postPhotoDataToAlbum } from '@/api/album';
import { PolaroidPhoto } from '@/components/album/_type';
import ModalManager from '@/components/common/Modal/ModalManager';
import AlbumEditTemplate from '@/components/template/AlbumEditTemplate';
import { ButtonVariant } from '@/constants/buttonTypes';
import { ModalType } from '@/enums/modalTypes';
import useModal from '@/hooks/useModal';
import { FeelingType } from '@/types/feeling';
import { WeatherType } from '@/types/weather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Image } from 'react-native';

/** config */
const feelings: FeelingType[] = ['없음', '😁', '😭', '😎', '🥰', '😛', '🥳'];
const weathers: WeatherType[] = ['없음', '☀️', '☁️', '☔️', '🌦️', '💨', '⛈️'];

/**
 * 엘범 내 폴라로이드 생성/수정 편집 페이지
 * * `CAUTION` 해당 컴포넌트에 수정/생성 분기에 따른 코드가 많음
 * * 수정: 챌린지를 통해 이미 올라간 사진에 글을 더하는 모드 (따라서 req body에 photoId가 들어감)
 * * 생성: 사용자 로컬 이미지 + 글 함께 작성하는 모드 (req body를 form-data로 전송)
 */
export default function AlbumEditScreen() {
  /** router */
  const router = useRouter();
  const { photo, place, newImageUri } = useLocalSearchParams<{
    photo?: string;
    place?: string;
    newImageUri?: string;
  }>();
  const placeParam = useMemo(() => (place ? decodeURIComponent(place) : ''), [place]);

  /** state */
  const [selectedFeeling, setSelectedFeeling] = useState<FeelingType>('없음');
  const [selectedWeather, setSelectedWeather] = useState<WeatherType>('없음');
  const [desc, setDesc] = useState('');

  /** hooks */
  const { show: showSaveModal, hide: hideSaveModal, ...saveModal } = useModal();
  const { show: showCancelModal, hide: hideCancelModal, ...cancelModal } = useModal();

  /** variable */
  const parsedPhoto: PolaroidPhoto | null = useMemo(() => {
    if (!photo) return null;
    try {
      return JSON.parse(decodeURIComponent(photo));
    } catch (e) {
      console.error('사진 파싱 실패:', e);
      return null;
    }
  }, [photo]);

  const imageSource = useMemo(() => {
    if (parsedPhoto) return parsedPhoto.image;
    if (newImageUri) return { uri: newImageUri };
    return undefined;
  }, [parsedPhoto, newImageUri]);

  const isSaveEnabled = desc.trim().length > 0;

  /** handler function */
  const handleSave = async () => {
    try {
      if (parsedPhoto) {
        // --- 수정 모드 (PATCH) ---
        const requestBody = {
          photoId: Number(parsedPhoto.id),
          feelings: selectedFeeling === '없음' ? undefined : selectedFeeling,
          weather: selectedWeather === '없음' ? undefined : selectedWeather,
          photoContent: desc,
          date: new Date(parsedPhoto.date).toISOString().split('T')[0],
        };
        const res = await patchPhotoToAlbum(requestBody);
        if (!res.isSuccess) throw new Error(res.message);
      } else if (newImageUri && placeParam) {
        // --- 생성 모드 (POST) ---
        const formData = new FormData();
        const filename = newImageUri.split('/').pop() || 'photo.jpg';
        const type = `image/${filename.split('.').pop()}`;
        formData.append('photo', { uri: newImageUri, name: filename, type } as any);
        formData.append('place', placeParam);
        formData.append('date', new Date().toISOString().split('T')[0]);
        selectedFeeling !== '없음' && formData.append('feelings', selectedFeeling);
        selectedWeather !== '없음' && formData.append('weather', selectedWeather);
        desc && formData.append('photoContent', desc);

        const res = await postPhotoDataToAlbum(formData);
        if (!res.isSuccess) throw new Error(res.message);
      } else {
        throw new Error('저장할 사진 정보가 없습니다.');
      }

      showSaveModal(ModalType.DEFAULT, {
        title: '오늘의 일기를 저장했어요',
        desc: '오늘도 행복한 추억을 만들었네요',
        children: (
          <Image
            source={require('@/assets/images/modal/icon-save-diary.png')}
            style={{ width: 80, height: 82 }}
          />
        ),
        buttons: {
          text: '확인',
          onPress: () => {
            hideSaveModal();
            router.back();
          },
        },
      });
    } catch (e: any) {
      console.error('저장 실패:', e);
      Alert.alert('저장 실패', e.message || '오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    showCancelModal(ModalType.DEFAULT, {
      title: '저장하지 않고 나갈까요?',
      desc: '작성한 내용이 모두 사라져요',
      children: (
        <Image
          source={require('@/assets/images/modal/icon-warning.png')}
          style={{ width: 80, height: 82 }}
        />
      ),
      options: [
        { text: '취소', variant: ButtonVariant.Subtle, onPress: hideCancelModal },
        { text: '나가기', variant: ButtonVariant.Primary, onPress: () => router.back() },
      ],
    });
  };

  /** lifecycle */
  useEffect(() => {
    if (parsedPhoto) {
      setSelectedFeeling((parsedPhoto.additional.feeling as FeelingType) ?? '없음');
      setSelectedWeather((parsedPhoto.additional.weather as WeatherType) ?? '없음');
      setDesc(parsedPhoto.additional.desc ?? '');
    }
  }, [parsedPhoto]);

  return (
    <>
      <AlbumEditTemplate
        imageSource={imageSource}
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
        isShowing={saveModal.isShowing}
        modalType={saveModal.modalType}
        modalProps={saveModal.modalProps}
        onClose={hideSaveModal}
      />
      <ModalManager
        isShowing={cancelModal.isShowing}
        modalType={cancelModal.modalType}
        modalProps={cancelModal.modalProps}
        onClose={hideCancelModal}
      />
    </>
  );
}
