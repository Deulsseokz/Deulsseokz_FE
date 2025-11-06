import api from '@/api/client';
import ChallengeDetailTemplate from '@/components/template/ChallengeDetailTemplate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMessaging, hasPermission } from '@react-native-firebase/messaging';
import dayjs from 'dayjs';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function ChallengeDetail() {
  const { id, image, placeName, content, point, condition1, condition2, condition3, friends } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const uriParts = image as string;
  const fileType = uriParts.split('.')[uriParts.split('.').length - 1];
  const formData = new FormData();
  const messaging = getMessaging();
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
      const authStatus = await hasPermission(messaging);
      console.log('authStatus', authStatus);
      if (!authStatus) {
        Alert.alert(
          '알림 권한 설정',
          Platform.OS === 'ios'
            ? '알림 권한을 허용해야만 챌린지에 도전할 수 있습니다.\n설정 > 앱 > Mellog > 알림 > 허용 후 리부팅해주세요.'
            : '알림 권한을 허용해야만 챌린지에 도전할 수 있습니다.\n설정 > 애플리케이션 > Mellog > 알림 > 허용 후 리부팅해주세요.',
          [
            { text: '설정 열기', onPress: () => Linking.openSettings() },
            { text: '닫기', style: 'cancel' },
          ],
        );
        return;
      }

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
      }
      Alert.alert('챌린지 심사 중', 'AI가 사진을 분석하고 있습니다. 분석이 끝나면 푸시 알림으로 알려드릴게요!');
    } catch (error) {
      console.log('챌린지 도전 error', error);
      Alert.alert('챌린지 도전 실패', 'owlcountry01@gmail.com으로 문의해주세요.');
    } finally {
      setIsLoading(false);
      router.back();
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
