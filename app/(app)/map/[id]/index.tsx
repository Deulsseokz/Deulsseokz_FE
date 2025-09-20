import api from '@/api/client';
import ChallengeDetailTemplate from '@/components/template/ChallengeDetailTemplate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function ChallengeDetail() {
  const { id, image, placeName, content, point, condition1, condition2, condition3, friends } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const uriParts = image as string;
  const fileType = uriParts.split('.')[uriParts.split('.').length - 1];
  const formData = new FormData();

  formData.append('place', placeName as string);
  if (typeof friends === 'string') {
    formData.append('friends', JSON.stringify(friends.split(',').map(Number)));
  }
  formData.append('attemptDate', dayjs().tz('Asia/Seoul').format('YYYY-MM-DD'));

  formData.append('attemptImage', {
    uri: image,
    name: `photo.${fileType}`,
    type: `image/jpeg`,
  } as any); // 또는 as unknown as Blob

  // 푸쉬 알림 권한 꺼두었으면 푸쉬 알림 권한 요청 후 제출
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await api.post(`${BASE_URL}/challenge/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('챌린지 도전의 res', res.data);
      if (res.data.code === 'CHALLENGE_SUBMITTED') {
        AsyncStorage.setItem('placeName', placeName as string);
        AsyncStorage.setItem('condition1', condition1 as string);
        AsyncStorage.setItem('condition2', condition2 as string);
        AsyncStorage.setItem('condition3', condition3 as string);
        AsyncStorage.setItem('point', point as string);
        AsyncStorage.setItem('image', image as string);
        AsyncStorage.setItem('attemptId', String(res.data.result.attemptId));
        router.replace('/(app)/(tabs)');
      }
    } catch (error) {
      console.log('챌린지 도전 error', error);
    } finally {
      setIsLoading(false);
      Alert.alert('챌린지 심사 중', 'AI가 사진을 분석하고 있습니다. 분석이 끝나면 푸시 알림으로 알려드릴게요!');
    }
  };
  return (
    <ChallengeDetailTemplate
      id={Number(id)}
      image={image as string}
      placeName={placeName as string}
      content={content as string}
      point={point as string}
      condition1={condition1 as string}
      condition2={condition2 as string}
      condition3={condition3 as string}
      friends={friends as string}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
